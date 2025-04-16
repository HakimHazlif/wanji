import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "./Header";
import Spinner from "../ui/Spinner";

const AppLayout = () => {
  // const location = useLocation();
  return (
    <>
      <Header />
      <main className="">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default AppLayout;
