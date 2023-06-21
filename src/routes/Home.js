import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center">
      {/* App mode selector */}
      <div className="h-10 w-[75%] md:w-[50%] lg:w-[20%] flex justify-center">
        <select
          className="h-full w-full border-2 rounded px-2 outline-none font-semibold text-gray-600"
          onChange={(e) => navigate(`${e.target.value}`)}
        >
          <option value="">Select visualizer mode</option>
          {/* <option value="">List</option> */}
          {/* <option value="">Queue</option> */}
          <option value="tree">Tree</option>
          <option value="stack">Stack</option>
        </select>
      </div>
    </div>
  );
};

export default Home;
