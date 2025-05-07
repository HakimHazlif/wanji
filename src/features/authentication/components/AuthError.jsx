import { useSelector } from "react-redux";

const AuthError = () => {
  const { error } = useSelector((state) => state.user);

  return (
    <div className="w-full bg-red-200 py-4 px-5 rounded">
      <p className="text-red-700 text-center">
        {error}. Please check your information and try again
      </p>
    </div>
  );
};

export default AuthError;
