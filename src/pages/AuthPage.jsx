import { Link, useNavigate } from "react-router";

import LoginForm from "../features/authentication/LoginForm";
import SignupForm from "../features/authentication/SignupForm";
import { useSession } from "../context/UserContext";
import { useSelector } from "react-redux";
import Spinner from "../ui/Spinner";

const SignLog = ({ type }) => {
  const navigate = useNavigate();
  const { removeAllAuthFields } = useSession();
  const isLogin = type === "login";

  const { status, isLoggedIn, error } = useSelector((state) => state.user);

  if (status === "loading") return <Spinner />;

  if (error) console.log(error);

  if (isLoggedIn) navigate("/");

  return (
    <main className="h-screen w-full flex justify-center items-start pt-10">
      <section className="w-[450px] rounded-xl bg-slate-50 text-black">
        <div className="py-8 px-16">
          {isLogin ? (
            <h2 className="mb-10 text-2xl text-center font-medium">
              Log <span className="text-orange-coral">in</span>
            </h2>
          ) : (
            <h2 className="mb-10 text-2xl text-center font-medium">
              Sign <span className="text-orange-coral">up</span>
            </h2>
          )}
          {isLogin ? <LoginForm /> : <SignupForm />}
          <div className="text-center">
            {isLogin ? (
              <p>
                <span>Don&apos;t have an account?</span>{" "}
                <Link
                  to="/signup"
                  onClick={removeAllAuthFields}
                  className="text-orange-coral font-medium cursor-pointer hover:text-orange-amber"
                >
                  Sign up
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Link
                  to="/login"
                  onClick={removeAllAuthFields}
                  className="text-orange-coral font-medium cursor-pointer hover:text-orange-amber"
                >
                  Login
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignLog;
