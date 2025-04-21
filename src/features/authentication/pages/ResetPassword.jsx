import { useState } from "react";
import ConfirmationMessage from "../components/ConfirmationMessage";
import SendResetPasswordForm from "../forms/SendResetPasswordForm";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [sended, setSended] = useState(false);

  return (
    <main className="h-screen w-full flex justify-center items-center">
      <section className="flex flex-col gap-5 justify-center items-center xl:[600px] lg:w-[550px] w-[500px] rounded-xl bg-slate-100 text-black">
        {sended ? (
          <ConfirmationMessage />
        ) : (
          <div className="flex flex-col justify-center items-center py-8 lg:px-24 md:px-20 sm:px-16 xs:px-10 px-6">
            <div className="text-center mb-6">
              <h3 className="text-orange-amber text-3xl font-bold mb-3">
                Forgot your password?
              </h3>
              <p className="text-slate-500 text-center">
                Your password will be reset by email, please enter your email
                address below
              </p>
            </div>

            <SendResetPasswordForm setSended={setSended} />

            <Link to="/login" className="text-orange-coral font-semibold">
              Back to log in
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default ResetPassword;
