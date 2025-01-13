import Logo from "../ui/Logo";
import Navbar from "../ui/Navbar";
import ProfileSwitcher from "../ui/ProfileSwitcher";

const Header = () => {
  return (
    <header className="padding-x py-5 flex items-center justify-between header-gradient">
      <Logo />
      <Navbar />
      <ProfileSwitcher />
    </header>
  );
};

export default Header;
