import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const SharedLayout = () => {
  return (
    <div className="main h-full w-full flex flex-col items-center justify-center">
      <Header />
      <main className={`w-full flex flex-col pb-5`}>
        <Outlet />
      </main>

      <div className="flex flex-col items-center text-gray-600">
        <div className="text-lg font-bold">CMP212 - Group 1</div>
        <div>PRESENTATION BUILD</div>
      </div>
    </div>
  );
};

export default SharedLayout;
