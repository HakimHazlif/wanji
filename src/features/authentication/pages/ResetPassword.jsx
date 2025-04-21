import { useState } from "react";
import ConfirmationMessage from "../components/ConfirmationMessage";
import SendResetPasswordForm from "../forms/SendResetPasswordForm";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [sended, setSended] = useState(true);

  return (
    <main className="h-screen w-full flex justify-center items-start pt-28">
      <section className="bg-slate-100 py-8 px-24 rounded-lg text-black w-[600px] flex flex-col gap-5 justify-center items-center">
        {sended ? (
          <ConfirmationMessage />
        ) : (
          <>
            <h3 className="text-orange-amber text-3xl font-bold">
              Forgot your password?
            </h3>
            <p className="text-slate-500 text-center">
              Your password will be reset by email, please enter your email
              address below
            </p>
            <SendResetPasswordForm setSended={setSended} />
            <Link to="/login" className="text-orange-coral font-semibold">
              Back to log in
            </Link>
          </>
        )}
      </section>
    </main>
  );
};

export default ResetPassword;
