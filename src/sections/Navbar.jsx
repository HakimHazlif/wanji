import { logoDark } from "../assets/icons";

const Navbar = () => {
  return (
    <nav className="flex gap-10 py-5 items-center">
      <div className="w-[100px]">
        <img src={logoDark} alt="logo" />
      </div>
      <ul className="flex text-white gap-5">
        <li>Home</li>
        <li>Profile</li>
        <li>Lists</li>
      </ul>
    </nav>
  );
};

export default Navbar;
