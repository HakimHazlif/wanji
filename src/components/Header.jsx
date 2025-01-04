import Logo from "../ui/Logo";
import Navbar from "../ui/Navbar";

const Header = () => {
  return (
    <header className="padding-x flex gap-10 py-5 items-center justify-between">
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;
