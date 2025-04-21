import { Link } from "react-router-dom";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";

const SignLog = ({ type }) => {
  const isLogin = type === "login";

  return (
    <main className="h-screen w-full flex justify-center items-start pt-10">
      <section className="w-[450px] rounded-xl bg-slate-50 text-black">
        <div className="py-8 px-16">
          <h2 className="mb-10 text-2xl text-center font-medium">
            {isLogin ? "Log" : "Create"}{" "}
            <span className="text-orange-coral">
              {isLogin ? "in" : "account"}
            </span>
          </h2>

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
