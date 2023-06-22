import logo from "../assets/logo-transparent.png";
const Header = () => {
  return (
    <div className="relative w-[80%] md:w-[50%] lg:w-[20%] flex items-center justify-center mb-10">
      <img
        className="h-12  border-r border-gray-800 mr-3 pr-3"
        src={logo}
        alt="DTV logo"
      />

      <div className="flex flex-col justify-center text-gray-800">
        <div className="font-bold text-lg leading-none">DTV</div>
        <div className="">Data Type Visualizer</div>
      </div>
    </div>
  );
};

export default Header;
