import Header from "./uiComponents/Header";
import { useState } from "react";

function App() {
  const [appMode, setAppMode] = useState(null);

  return (
    <div className="main h-full w-full flex flex-col items-center justify-center">
      <Header />
      <div className="h-10"></div>

      {/* Set App mode */}
      {!appMode && (
        <div className="w-full flex flex-col items-center">
          {/* App mode selector */}
          <div className="h-10 w-[75%] md:w-[50%] lg:w-[30%] flex justify-center">
            <select
              className="h-full w-full border-2 rounded px-2 outline-none font-semibold text-gray-600"
              onChange={(e) => setAppMode(e?.target?.value)}
            >
              <option value="">Select visualizer mode</option>
              <option value="array">Array</option>
              <option value="list">List</option>
              <option value="stack">Stack</option>
              <option value="queue">Queue</option>
              <option value="tree">Tree</option>
              <option value="graph">Graph</option>
            </select>
          </div>
        </div>
      )}

      {appMode === "tree" && (
        <div className="w-[50%] md:w-[30%] lg:w-[20%] flex flex-col items-center">
          <div className="row-1 mb-8 z-20">
            <input
              type="text"
              maxLength={2}
              className="flex justify-center text-center rounded-full h-10 w-10 border-2 border-gray-600 font-semibold font-semibold"
            />
          </div>

          <div className="row-2 w-full flex mb-8">
            <div className="relative flex justify-center w-[50%]">
              <input
                type="text"
                maxLength={2}
                className="text-center rounded-full h-10 w-10 border-2 border-gray-600 font-semibold z-20"
              />

              <div className="left-arrow absolute h-20 rotate-[40deg] w-[2px] bottom-[50%] right-[25%] z-10 bg-gray-600"></div>
            </div>
            <div className="relative flex justify-center w-[50%]">
              <input
                type="text"
                maxLength={2}
                className="text-center rounded-full h-10 w-10 border-2 border-gray-600 font-semibold z-20"
              />

              <div className="right-arrow absolute h-20 rotate-[-40deg] w-[2px] bottom-[50%] left-[25%] z-10 bg-gray-600"></div>
            </div>
          </div>

          <div className="row-3 w-full flex mb-10">
            <div className="relative w-[25%] flex justify-center">
              <input
                type="text"
                maxLength={2}
                className="text-center rounded-full h-10 w-10 border-2 border-gray-600 font-semibold z-20"
              />

              <div className="left-arrow absolute h-20 rotate-[25deg] w-[2px] bottom-[50%] right-[25%] z-10 bg-gray-600"></div>
            </div>
            <div className="relative w-[25%] flex justify-center">
              <input
                type="text"
                maxLength={2}
                className="text-center rounded-full h-10 w-10 border-2 border-gray-600 font-semibold relative z-20"
              />

              <div className="right-arrow absolute h-20 rotate-[-25deg] w-[2px] bottom-[50%] left-[25%] z-10 bg-gray-600"></div>
            </div>
            <div className="relative w-[25%] flex justify-center">
              <input
                type="text"
                maxLength={2}
                className="text-center rounded-full h-10 w-10 border-2 border-gray-600 font-semibold z-20"
              />
              <div className="left-arrow absolute h-20 rotate-[25deg] w-[2px] bottom-[50%] right-[25%] z-10 bg-gray-600"></div>
            </div>
            <div className="relative w-[25%] flex justify-center">
              <input
                type="text"
                maxLength={2}
                className="text-center rounded-full h-10 w-10 border-2 border-gray-600 font-semibold z-20"
              />
              <div className="left-arrow absolute h-20 rotate-[-25deg] w-[2px] bottom-[50%] left-[25%] z-10 bg-gray-600"></div>
            </div>
          </div>

          <div className="text-gray-600 text-center text-lg font-semibold mb-10 leading-[1.3]">
            Please add values to the <br />
            tree to create it.
          </div>

          <button className="h-10 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold px-10">
            Create Tree
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
