import { useSelector } from "react-redux";
import { useSession } from "../context/UserContext";
import InputText from "../ui/InputText";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";

const UpdatePassword = () => {
  const { transitionNavigate } = useTransitionNavigate();
  const { status, isLoggedIn } = useSelector((state) => state.user);
  const { user, handleUpdatePassword, isConfirmed } = useSession();

  useEffect(() => {
    if (isLoggedIn) transitionNavigate("/");
  }, [isLoggedIn, transitionNavigate]);

  if (status === "loading") return <Spinner />;

  return (
    <main className="w-full h-[100vh] bg-[#0e0e6b] flex justify-center items-start pt-28">
      <section className="bg-slate-100 py-8 px-24 rounded-lg text-black w-[600px] flex flex-col gap-5 justify-center items-center">
        <h3 className="text-orange-amber text-3xl font-bold">
          Change your password
        </h3>
        <p>
          Enter a new password below to change your password for
          <span className="font-semibold text-orange-amber">{user.email}</span>
        </p>
        <form
          className="w-full text-sm flex flex-col gap-3"
          onSubmit={handleUpdatePassword}
        >
          <InputText
            type="password"
            label="password"
            labelText="New password"
          />
          <InputText
            type="password"
            label="passwordConfirm"
            labelText="Confirm password"
            unmatchError={isConfirmed}
          />
          <button className="bg-orange-amber text-white font-semibold text-lg py-2 w-full rounded-xl my-4">
            Change password
          </button>
        </form>
      </section>
    </main>
  );
};

export default UpdatePassword;
