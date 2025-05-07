import { Link } from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";
import { useSelector } from "react-redux";

const SignLog = ({ type }) => {
  const isLogin = type === "login";

  const { error } = useSelector((state) => state.user);

  console.log(error);

  return (
    <main className="h-screen w-full flex justify-center items-center">
      <section className="xl:[550px] lg:w-[500px] w-[450px] rounded-xl bg-slate-100 text-black">
        <div className="py-8 sm:px-16 xs:px-8 px-4">
          <div className="mb-5">
            <h1 className="text-2xl text-center font-medium">
              {isLogin ? "Welcome" : "Create your"}{" "}
              <span className="text-orange-coral">
                {isLogin ? "back" : "account"}
              </span>
            </h1>
            <p className="text-gray-600 text-center mt-2 text-sm">
              {isLogin
                ? "Access your lists, ratings, and reviews in a click"
                : "Sign up to get started — it only takes a minute"}
            </p>
          </div>

          {isLogin ? <LoginForm /> : <SignupForm />}

          <div className="text-center">
            <p>
              <span>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
              </span>{" "}
              <Link
                to={isLogin ? "/signup" : "/login"}
                className="text-orange-coral font-medium cursor-pointer hover:text-orange-amber"
              >
                {isLogin ? "Sign up" : "Login"}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignLog;
