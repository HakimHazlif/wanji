import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter your username")
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must be at most 30 characters"),
  email: Yup.string()
    .required("Please enter your email")
    .email("Email must be a valid email address"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
  passwordConfirm: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Password must match"),
});
