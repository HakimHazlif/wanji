import { useState } from "react";
import SendPasswordResetEmail from "../features/authentication/SendPasswordResetEmail";
import { Link } from "react-router-dom";
import { useSession } from "../context/UserContext";
import ConfirmationMessage from "../ui/ConfirmationMessage";

const ResetPassword = () => {
  const { user } = useSession();
  const [sended, setSended] = useState(false);
  return (
    <main className="w-full h-[100vh] bg-[#0e0e6b] flex justify-center items-start pt-28">
      <section className="bg-slate-100 py-8 px-24 rounded-lg text-black w-[600px] flex flex-col gap-5 justify-center items-center">
        {sended ? (
          <ConfirmationMessage email={user.email} />
        ) : (
          <>
            <h3 className="text-orange-amber text-3xl font-bold">
              Forgot your password?
            </h3>
            <p className="text-slate-500 text-center">
              Your password will be reset by email, please enter your email
              address below
            </p>
            <SendPasswordResetEmail setSended={setSended} />
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
