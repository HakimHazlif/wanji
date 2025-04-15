import { createContext, useContext, useState } from "react";
import { emailRegex } from "../constants/variables";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  signup,
  updateAuthPassword,
} from "../features/authentication/api/apiAuth";
import { useNavigate } from "react-router-dom";

const SessionContext = createContext();

function SessionContextProvider({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [emptyFields, setEmptyFields] = useState({
    username: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const [isRegex, setIsRegex] = useState(true);
  const [isValidLength, setIsValidLength] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  function handleChangeUser(e, label) {
    const { value } = e.target;

    setUser({ ...user, [label]: value });
  }

  function handleCancelError(label) {
    setEmptyFields({ ...emptyFields, [label]: false });
    setIsRegex(true);
    setIsValidLength(false);
    setIsConfirmed(false);
  }

  function removeAllAuthFields() {
    setEmptyFields({
      username: false,
      email: false,
      password: false,
      passwordConfirm: false,
    });
    setIsRegex(true);
    setIsValidLength(false);
    setIsConfirmed(false);

    setUser({
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });
  }

  function handleSignupSubmit(e) {
    e.preventDefault();

    if (
      !user.email ||
      !user.password ||
      !user.username ||
      !user.passwordConfirm
    ) {
      const newErrors = {
        username: user.username === "",
        email: user.email === "",
        password: user.password === "",
        passwordConfirm: user.passwordConfirm === "",
      };

      setEmptyFields(newErrors);
      return;
    }

    if (!emailRegex.test(user.email)) {
      setIsRegex(false);
      return;
    }

    if (user.password.length < 8) {
      setIsValidLength(true);
      return;
    }

    if (user.passwordConfirm !== user.password) {
      setIsConfirmed(true);
      return;
    }

    dispatch(
      signup({
        username: user.username,
        email: user.email,
        password: user.password,
      })
    )
      .unwrap()
      .then(() => navigate("/"));

    if (isLoggedIn) {
      removeAllAuthFields();
    }
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      setEmptyFields((prev) => ({
        ...prev,
        email: user.email === "",
        password: user.password === "",
      }));
      return;
    }

    if (user.email && !emailRegex.test(user.email)) {
      setIsRegex(false);
      return;
    }

    if (user.password.length < 8) {
      setIsValidLength(true);
      return;
    }

    dispatch(login({ email: user.email, password: user.password }))
      .unwrap()
      .then(() => navigate("/"));

    if (isLoggedIn) {
      removeAllAuthFields();
    }
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (user.password.length < 8) {
      setIsValidLength(true);
      return;
    }

    if (user.passwordConfirm !== user.password) {
      setIsConfirmed(true);
      return;
    }

    dispatch(updateAuthPassword(user.password));

    if (isLoggedIn) {
      removeAllAuthFields();
    }
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        emptyFields,
        isRegex,
        isValidLength,
        isConfirmed,
        handleChangeUser,
        setEmptyFields,
        handleCancelError,
        setIsRegex,
        setIsValidLength,
        handleSignupSubmit,
        handleLoginSubmit,
        removeAllAuthFields,
        handleUpdatePassword,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context)
    throw new Error("SessionContext was used outside of SessionProvider");

  return context;
}

export default SessionContextProvider;
