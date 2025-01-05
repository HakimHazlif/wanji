const Navbar = () => {
  return (
    <nav className="flex justify-between items-center gap-20">
      <ul className="flex text-gray-500 gap-10 font-semibold">
        <li>Home</li>
        <li>Profile</li>
        <li>Lists</li>
      </ul>
    </nav>
  );
};

export default Navbar;
