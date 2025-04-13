// // import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { emailRegex } from "../../constants/variables";
import { useSession } from "../../context/UserContext";
import InputText from "../../ui/InputText";
import { Link } from "react-router-dom";

const LoginForm = () => {
  // const dispatch = useDispatch();
  const { handleLoginSubmit } = useSession();

  return (
    <section>
      <form
        className="text-sm flex flex-col gap-3"
        onSubmit={handleLoginSubmit}
      >
        <InputText type="text" label="email" labelText="Email" />
        <InputText type="password" label="password" labelText="Password" />
        <div className="flex justify-center">
          <Link
            to="/reset-password"
            className="text-orange-coral font-medium hover:text-orange-amber text-center -mb-4"
          >
            Forget password?
          </Link>
        </div>
        <button className="bg-orange-amber text-white font-semibold text-lg py-2 w-full rounded-xl my-4">
          Log up
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
