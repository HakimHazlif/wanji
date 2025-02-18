import Logo from "../ui/Logo";
import Navbar from "../ui/Navbar";
import ProfileSwitcher from "../ui/ProfileSwitcher";

const Header = () => {
  return (
    <header className="padding-x py-5 pb-40 flex items-center justify-between header-gradient gap-5">
      <Logo />
      <div className="w-[65%] xl:w-[60%] 2xl:w-[50%] flex  md:justify-between justify-start sm:gap-4 gap-3  items-center md:flex-row flex-row-reverse">
        <Navbar />
        <ProfileSwitcher />
      </div>
    </header>
  );
};

export default Header;
