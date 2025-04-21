import { useSelector } from "react-redux";
import { useSession } from "../../../context/SessionContext";
import Spinner from "../../../ui/Spinner";
import UpdatePasswordForm from "../forms/UpdatePasswordForm";

const UpdatePassword = () => {
  const { status } = useSelector((state) => state.user);
  const { email } = useSession();

  if (status === "loading") return <Spinner />;

  return (
    <main className="w-full h-screen flex justify-center items-start pt-28">
      <section className="bg-slate-100 py-8 px-24 rounded-lg text-black w-[600px] flex flex-col gap-2 justify-center items-center">
        <h3 className="text-orange-amber text-3xl font-bold">
          Change your password
        </h3>
        <p className="mb-3 text-center">
          Enter a new password below to change your password for{" "}
          <span className="font-semibold text-orange-amber">{email}</span>
        </p>
        <UpdatePasswordForm />
      </section>
    </main>
  );
};

export default UpdatePassword;
