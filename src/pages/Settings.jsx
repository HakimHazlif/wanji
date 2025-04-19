import { RiAccountCircleLine, RiProfileLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import HeaderBackDrop from "../ui/HeaderBackDrop";

const Settings = () => {
  const { username } = useSelector((state) => state.user.user);
  const location = useLocation();

  const sidebarItems = [
    {
      title: "Profile",
      icon: <RiProfileLine size={20} />,
      path: `/u/${username.replace(" ", "-")}/settings/profile`,
    },
    {
      title: "Account",
      icon: <RiAccountCircleLine size={20} />,
      path: `/u/${username.replace(" ", "-")}/settings/account`,
    },
  ];

  return (
    <main className="padding-x">
      <HeaderBackDrop />
      <div className="pb-10">
        <div className="flex flex-col md:flex-row bg-bluish-black rounded-xl">
          <div className="md:w-1/4">
            <nav className="w-full md:pt-8 py-2 md:px-0 px-2 flex flex-row md:flex-col">
              {sidebarItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 justify-center w-full py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-orange-amber text-gray-900"
                      : "text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex-1">
            <div className="p-8 pb-12 bg-[#1c1b27] rounded-lg shadow-sm">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;
