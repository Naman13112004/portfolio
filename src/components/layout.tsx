import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const Layout = () => {
  return (
    <div className="relative bg-white dark:bg-black min-h-screen">
      <Navbar />
      
      {/* The Main Content Wrapper
        mb-[400px]: Reserves space for the footer to "reveal" behind it.
        z-10: Ensures this content slides OVER the footer.
        bg-white/black: Ensures opacity so footer is hidden until scroll.
      */}
      <main className="relative z-10 bg-white dark:bg-black shadow-2xl mb-100 min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;