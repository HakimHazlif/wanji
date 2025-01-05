import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig.js";
import {
  authFailure,
  authStart,
  authSuccess,
  logOutSuccess,
  setUser,
} from "../features/Authentication/authSlice.js";

export const registerUser = (username, email, password) => async (dispatch) => {
  dispatch(authStart());

  try {
    await setPersistence(auth, browserSessionPersistence);

    const userCredenial = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredenial.user;

    // store user name in firebase
    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      uid: user.uid,
    });

    dispatch(authSuccess({ uid: user.uid, username, email }));
  } catch (err) {
    dispatch(authFailure(err.message));
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(authStart());
  //const auth = getAuth()
  await setPersistence(auth, browserSessionPersistence);

  try {
    const userCredenial = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredenial.user;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      dispatch(
        authSuccess({
          uid: user.uid,
          username: userData.username,
          email: user.email,
        })
      );
    }
  } catch (err) {
    dispatch(authFailure(err.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  //const auth = getAuth();
  try {
    await signOut(auth);
    dispatch(logOutSuccess());
  } catch (err) {
    dispatch(authFailure(err.message));
  }
};

export const generatePasswordResetLink = (email) => async (dispatch) => {
  try {
    await sendPasswordResetEmail(auth, email);
    dispatch();
  } catch (err) {
    dispatch(authFailure(err.message));
  }
};

export const monitorAuthState = () => async (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            username: userData.username,
          })
        );
      }
    } else {
      dispatch(setUser({ uid: "", email: "", username: "" }));
    }
  });
};
