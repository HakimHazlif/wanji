import { useSelector } from "react-redux";
import { useSession } from "../../../context/SessionContext";
import Spinner from "../../../ui/Spinner";
import UpdatePasswordForm from "../forms/UpdatePasswordForm";

const UpdatePassword = () => {
  const { status } = useSelector((state) => state.user);
  const { email } = useSession();

  if (status === "loading") return <Spinner />;

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <section className="flex flex-col gap-5 justify-center items-center xl:[600px] lg:w-[550px] w-[500px] rounded-xl bg-slate-100 text-black py-8 lg:px-20 md:px-16 sm:px-10 xs:px-6 px-4">
        <h3 className="text-orange-amber text-3xl font-bold text-center">
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
