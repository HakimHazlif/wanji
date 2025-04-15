import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "../../context/UserContext";
import { resetForgottenPassword } from "./api/apiAuth";

const SendPasswordResetEmail = ({ setSended }) => {
  const dispatch = useDispatch();
  const { user, handleChangeUser } = useSession();
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.email) {
      setError(true);
      return;
    }

    setSended(true);
    dispatch(resetForgottenPassword(user.email));
  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label htmlFor="email" className="block mb-2 text-slate-400 text-sm">
        Enter your email address
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={user.email}
        onFocus={() => setError(false)}
        onChange={(e) => handleChangeUser(e, "email")}
        className={`w-full py-2 px-3 border rounded-lg outline-none ${
          error
            ? "border-strawberry"
            : "border-slate-300 focus:border-orange-amber"
        }`}
      />
      {error && (
        <p className="text-strawberry mt-1">* This field is required</p>
      )}
      <button
        type="submit"
        className="w-full py-2 bg-orange-amber hover:bg-orange-coral duration-300 transition-colors rounded-lg text-white font-medium mt-5"
      >
        Reset your password
      </button>
    </form>
  );
};

export default SendPasswordResetEmail;
