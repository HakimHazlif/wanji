import { Outlet } from "react-router";
import Header from "./Header";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
