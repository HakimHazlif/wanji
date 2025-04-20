import { FaArrowLeft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { spaceman } from "../assets/icons";

const navigations = [
  { title: "Home", to: "/" },
  { title: "Movies", to: "/movies" },
  { title: "Tv Shows", to: "/tv" },
];

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="padding-x bg-[url(/src/assets/bg-stars.jpg)]  bg-cover bg-center bg-no-repeat min-h-screen min-w-full ">
      <div className="flex sm:flex-row flex-col-reverse items-center">
        <div className="sm:py-32 py-10 w-full flex flex-col sm:items-start items-center">
          <div className="relative">
            <h1 className="absolute top-1/4 -translate-y-1/2 max-sm:left-1/2 max-sm:-translate-x-1/2 opacity-20 font-extrabold text-orange-coral text-[150px]">
              404
            </h1>
            <h2 className="relative z-10 text-6xl font-bold text-white">
              Ooops!
            </h2>
          </div>

          <div className="mt-2 xl:w-80 lg:w-72 w-[260px] max-sm:text-center flex flex-col sm:items-start items-center">
            <p className="font-normal text-lg mb-5">
              We can&lsquo;t find the page you requested.
            </p>
            <button
              className="px-6 py-2 bg-orange-amber hover:bg-orange-coral duration-200 transition-colors rounded-md font-medium flex items-center gap-2"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft />
              <span>Go back</span>
            </button>

            <p className="font-normal text-lg my-5">
              Or maybe in these pages you can find what you&lsquo;re looking
              for:
            </p>

            <ul className="flex flex-wrap gap-y-3 gap-5">
              {navigations.map((nav) => (
                <li key={nav.title}>
                  <NavLink
                    to={nav.to}
                    className="underline text-orange-amber hover:text-amber-300 duration-200 transition-colors font-medium"
                  >
                    {nav.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <img
            src={spaceman}
            alt="space man"
            className="md:w-[300px] sm:w-[200px] w-[150px]"
          />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
