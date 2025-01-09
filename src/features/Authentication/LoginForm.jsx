// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { emailRegex } from "../../constants/variables";
import { useSession } from "../../context/UserContext";
import InputText from "../../ui/InputText";
import { useNavigate } from "react-router";
import Spinner from "../../ui/Spinner";

const AuthPage = () => {
  // const dispatch = useDispatch();
  const { handleLoginSubmit } = useSession();

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/reset-password");
  };

  return (
    <section>
      <form
        className="text-sm flex flex-col gap-3"
        onSubmit={handleLoginSubmit}
      >
        <InputText type="text" label="email" labelText="Email" />
        <InputText type="password" label="password" labelText="Password" />
        <div className="flex justify-center">
          <button
            onClick={handleRedirect}
            className="text-orange-coral font-medium hover:text-orange-amber text-center -mb-4"
          >
            Forget password?
          </button>
        </div>
        <button className="bg-orange-amber text-white font-semibold text-lg py-2 w-full rounded-xl my-4">
          Log up
        </button>
      </form>
    </section>
  );
};

export default AuthPage;
