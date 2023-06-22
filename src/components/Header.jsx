const Header = () => {
  return (
    <div className="relative w-[80%] md:w-[50%] lg:w-[20%] flex items-center justify-center mb-10">
      <div className="text-3xl font-bold text-center">Data-Visualizer</div>
      <div className="absolute h-5 w-9 flex items-center justify-center text-xs font-semibold text-white bg-red-600 py-[2px] rounded-md top-[-15px] right-10">
        v1.0
      </div>
    </div>
  );
};

export default Header;
