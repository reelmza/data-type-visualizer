const Header = () => {
  return (
    <div className="w-[80%] md:w-[50%] lg:w-[20%] relative flex items-center justify-between mb-10">
      <div className="text-3xl font-bold">Data-Visualizer</div>
      <div className="h-5 w-10 flex items-center justify-center text-xs font-semibold text-white bg-red-600 py-[2px] rounded-md">
        v1.0
      </div>
    </div>
  );
};

export default Header;
