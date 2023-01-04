import { Outlet } from "react-router-dom";
import Footer from "../components/Navigation/Footer";
import ScrollToTop from "../components/helpers/ScrollToTop";
import Navbar from "../components/Navigation/Navbar";

export default function Root() {
  return (
    <div>
      <Navbar />
      <main className="pt-16 flex justify-center min-h-[calc(100vh-14rem)]">
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </main>
      <Footer />
    </div>
  );
}
