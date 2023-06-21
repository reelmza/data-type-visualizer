const Header = () => {
  return (
    <div className={`relative flex mb-10`}>
      <div className="text-3xl font-bold mr-2">Data-Visualizer</div>
      <div className="absolute right-2 top-[-12px] text-xs font-semibold text-white bg-red-600 h-fit px-1.5 py-[2px] rounded-md">
        v1.0
      </div>
    </div>
  );
};

export default Header;
