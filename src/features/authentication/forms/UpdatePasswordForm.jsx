import { Form, Formik } from "formik";
import { updatePasswordSchema } from "../schemas/updatePasswordSchema";
import InputField from "../../../ui/InputField";
import { MdOutlineLockOpen } from "react-icons/md";
import SubmitionButton from "../../../ui/SubmitionButton";
import { useDispatch, useSelector } from "react-redux";
import SpinnerMini from "../../../ui/SpinnerMini";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateAuthPassword } from "../api/apiAuth";
import AuthError from "../components/AuthError";

const UpdatePasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={updatePasswordSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(updateAuthPassword(values.password))
          .unwrap()
          .then(() => navigate("/"));

        setSubmitting(false);
      }}
    >
      {() => (
        <Form className="w-full text-sm flex flex-col gap-3">
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

          {error && <AuthError />}

          <SubmitionButton>
            {status === "loading" ? <SpinnerMini /> : "Change password"}
          </SubmitionButton>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePasswordForm;
