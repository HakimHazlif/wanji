import { useDispatch, useSelector } from "react-redux";
import { resetForgottenPassword } from "../api/apiAuth";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../../ui/InputField";
import { MdAlternateEmail } from "react-icons/md";
import SubmitionButton from "../../../ui/SubmitionButton";
import SpinnerMini from "../../../ui/SpinnerMini";
import { useSession } from "../../../context/SessionContext";
import AuthError from "../components/AuthError";

const resetByEmailSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter your email")
    .email("Email must be a valid email address"),
});

const SendResetPasswordForm = ({ setSended }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  const { setEmail } = useSession();

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={resetByEmailSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(resetForgottenPassword(values.email))
          .unwrap()
          .then(() => {
            setEmail(values.email);
            setSended(true);
          });

        setSubmitting(false);
      }}
    >
      {() => (
        <Form className="w-full flex flex-col gap-3">
          <InputField
            id="email"
            label="Enter your email address"
            icon={<MdAlternateEmail className="h-5 w-5 text-gray-400" />}
            type="email"
            placeholder="Your Email"
          />

          {error && <AuthError />}

          <SubmitionButton>
            {status === "loading" ? <SpinnerMini /> : "Reset your password"}
          </SubmitionButton>
        </Form>
      )}
    </Formik>
  );
};

export default SendResetPasswordForm;
