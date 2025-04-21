import * as Yup from "yup";

export const updatePasswordSchema = Yup.object().shape({
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
