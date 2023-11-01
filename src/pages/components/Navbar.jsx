import Logo from "../../components/Logo";

const Navbar = ({ seletedImage }) => {
  // Delete Image/Images function

  return (
    <header className="w-full mx-auto z-50 bg-blue-50 flex items-center top-0 fixed h-16 border border-b-2">
      <div className="px-6 flex w-full items-center justify-between">
        {/* Logo */}
        <Logo />
        {/* Delete Button */}
      </div>
    </header>
  );
};

export default Navbar;