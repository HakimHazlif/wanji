import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { MdAlternateEmail, MdOutlineLockOpen } from "react-icons/md";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema } from "../schemas/loginSchema";
import { login } from "../api/apiAuth";
import InputField from "../../../ui/InputField";
import SubmitionButton from "../../../ui/SubmitionButton";
import SpinnerMini from "../../../ui/SpinnerMini";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { status } = useSelector((state) => state.user);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        const { email, password } = values;

        dispatch(login({ email, password }))
          .unwrap()
          .then(() => navigate("/"));

        setSubmitting(false);
      }}
    >
      {() => (
        <Form className="text-sm flex flex-col gap-3">
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
          <div className="flex justify-center">
            <Link
              to="/reset-password"
              className="text-orange-coral font-medium hover:text-orange-amber text-center -mb-4"
            >
              Forget password?
            </Link>
          </div>
          <SubmitionButton>
            {status === "loading" ? <SpinnerMini /> : "Log up"}
          </SubmitionButton>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
