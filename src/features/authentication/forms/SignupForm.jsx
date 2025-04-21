import { Form, Formik } from "formik";
import { signupSchema } from "../schemas/signupSchema";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../api/apiAuth";
import { useNavigate } from "react-router-dom";
import InputField from "../../../ui/InputField";
import { FaRegUser } from "react-icons/fa";
import { MdAlternateEmail, MdOutlineLockOpen } from "react-icons/md";
import { useState } from "react";
import SpinnerMini from "../../../ui/SpinnerMini";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { status } = useSelector((state) => state.user);

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={signupSchema}
      onSubmit={(values, { setSubmitting }) => {
        const { username, email, password } = values;
        dispatch(
          signup({
            username,
            email,
            password,
          })
        )
          .unwrap()
          .then(() => navigate("/"));

        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="text-sm flex flex-col gap-3">
          <InputField
            id="username"
            label="User name"
            icon={<FaRegUser className="h-5 w-5 text-gray-400" />}
            type="text"
            placeholder="Your Username"
          />
          <InputField
            id="email"
            label="Email Address"
            icon={<MdAlternateEmail className="h-5 w-5 text-gray-400" />}
            type="email"
            placeholder="Your Email"
          />

          <InputField
            id="password"
            label="Password"
            icon={<MdOutlineLockOpen className="h-5 w-5 text-gray-400" />}
            type={showPassword ? "text" : "password"}
            placeholder="Your Password"
            forPassword={true}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <InputField
            id="passwordConfirm"
            label="Confirm Password"
            icon={<MdOutlineLockOpen className="h-5 w-5 text-gray-400" />}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Your Password"
            forPassword={true}
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
          />
          <button
            className="bg-orange-amber text-white font-semibold text-lg py-2 w-full rounded-xl my-4"
            type="submit"
            disabled={isSubmitting}
          >
            {status === "loading" ? <SpinnerMini /> : "Sign up"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
