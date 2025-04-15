import { useSession } from "../../../context/UserContext";
import InputText from "../../../ui/InputText";

const SignupForm = () => {
  const { handleSignupSubmit, isConfirmed } = useSession();

  return (
    <section>
      <form
        className="text-sm flex flex-col gap-3"
        onSubmit={handleSignupSubmit}
      >
        <InputText type="text" label="username" labelText="User Name" />
        <InputText type="text" label="email" labelText="Email" />
        <InputText type="password" label="password" labelText="Password" />
        <InputText
          type="password"
          label="passwordConfirm"
          labelText="Password Confirm"
          unmatchError={isConfirmed}
        />
        <button className="bg-orange-amber text-white font-semibold text-lg py-2 w-full rounded-xl my-4">
          Sign up
        </button>
      </form>
    </section>
  );
};

export default SignupForm;
