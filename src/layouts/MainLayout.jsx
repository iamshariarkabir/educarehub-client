import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-[calc(100vh-300px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
