import supabase from "./supabase";
import {
  authFailure,
  authStart,
  authSuccess,
  logOutSuccess,
  setUser,
  resetPassword,
} from "../features/Authentication/authSlice.js";

export const signup = (username, email, password) => async (dispatch) => {
  try {
    dispatch(authStart());
    const { data: user, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          avatar: "",
        },
      },
    });

    if (signupError) throw new Error(signupError.message);

    if (user) {
      const watchlistId = crypto.randomUUID();
      const favoriteId = crypto.randomUUID();

      const { error } = await supabase
        .from("lists")
        .insert([
          { id: watchlistId, user_id: user.user.id, name: "watchlist" },
          { some_column: favoriteId, user_id: user.user.id, name: "favorite" },
        ])
        .select();

      if (error) throw new Error(error.message);
    }

    dispatch(
      authSuccess({
        uid: user.user.id,
        username: user.user.user_metadata.username,
        email: user.user.email,
        avatar: user.user.user_metadata.avatar,
        createdAt: user.user.created_at,
        lastSignin: user.user.last_sign_in_at,
        lastUpdate: user.user.updated_at,
      })
    );
  } catch (err) {
    dispatch(authFailure(err));
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(authStart());

    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // console.log(error);
      throw new Error(error.message);
    }

    console.log(user);

    dispatch(
      authSuccess({
        uid: user.user.id,
        username: user.user.user_metadata.username,
        email: user.user.email,
        avatar: user.user.user_metadata.avatar,
        createdAt: user.user.created_at,
        lastSignin: user.user.last_sign_in_at,
        lastUpdate: user.user.updated_at,
      })
    );
  } catch (err) {
    dispatch(authFailure(err));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(authStart());

    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message);
    dispatch(logOutSuccess());
  } catch (err) {
    dispatch(authFailure(err));
  }
};

export const resetForgottenPassword = (email) => async (dispatch) => {
  try {
    dispatch(authStart());
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password",
    });

    if (error) throw new Error(error.message);

    dispatch(resetPassword());
  } catch (err) {
    dispatch(authFailure(err));
  }
};

export const updateAuth =
  (email, password, username, avatar) => async (dispatch) => {
    try {
      dispatch(authStart());
      const { data: user, error } = await supabase.auth.updateUser({
        email,
        password,
        data: { username, avatar },
      });

      if (error) throw new Error(error.message);

      dispatch(
        authSuccess({
          uid: user.user.id,
          username: user.user.user_metadata.username,
          email: user.user.email,
          avatar: user.user.user_metadata.avatar,
          createdAt: user.user.created_at,
          lastSignin: user.user.last_sign_in_at,
          lastUpdate: user.user.updated_at,
        })
      );
    } catch (err) {
      dispatch(authFailure(err));
    }
  };

export const updateAuthPassword = (password) => async (dispatch) => {
  try {
    dispatch(authStart());
    const { data: user, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) throw new Error(error.message);

    dispatch(
      authSuccess({
        uid: user.user.id,
        username: user.user.user_metadata.username,
        email: user.user.email,
        avatar: user.user.user_metadata.avatar,
        createdAt: user.user.created_at,
        lastSignin: user.user.last_sign_in_at,
        lastUpdate: user.user.updated_at,
      })
    );
  } catch (err) {
    dispatch(authFailure(err));
  }
};

export const getUser = () => async (dispatch) => {
  try {
    dispatch(authStart());
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user)
      dispatch(
        setUser({
          uid: user.id,
          username: user.user_metadata.username,
          email: user.email,
          avatar: user.user_metadata.avatar,
          createdAt: user.created_at,
          lastSignin: user.last_sign_in_at,
          lastUpdate: user.updated_at,
        })
      );
    else dispatch(logOutSuccess());
  } catch (err) {
    dispatch(authFailure(err));
  }
};
