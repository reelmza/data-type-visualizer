import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const SharedLayout = () => {
  return (
    <div className="main h-full w-full flex flex-col items-center justify-center">
      <Header />
      <main className={`w-full flex flex-col pb-5`}>
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;
