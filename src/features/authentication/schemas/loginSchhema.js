import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter your email")
    .email("Email must be a valid email address"),
  password: Yup.string().required("Please enter your password"),
});
