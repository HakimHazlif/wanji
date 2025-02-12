import { RiAccountCircleLine, RiProfileLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router";
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
      <div className="py-6">
        <div className="flex flex-col md:flex-row gap-4 bg-bluish-black rounded-xl">
          <div className="w-1/4 md-w-64">
            <nav className="px-5 py-10">
              <ul className="space-y-2">
                {sidebarItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                        location.pathname === item.path
                          ? "bg-orange-amber text-gray-900"
                          : "text-gray-400 hover:bg-gray-700"
                      }`}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex-1">
            <div className="p-10 pb-12 bg-[#1c1b27]  rounded-lg shadow-sm">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;
