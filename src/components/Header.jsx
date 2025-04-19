import Logo from "../ui/Logo";
import Navbar from "../ui/Navbar";
import ProfileSwitcher from "../ui/ProfileSwitcher";

const Header = () => {
  return (
    <header className="padding-x py-5 pb-20 flex items-center justify-between header-gradient gap-5">
      <Logo />
      <Navbar />
      <div className="max-md:hidden">
        <ProfileSwitcher />
      </div>
    </header>
  );
};

export default Header;
