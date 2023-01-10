import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components/Navigation";
import ScrollToTop from "../components/helpers/ScrollToTop";

export default function Root() {
  return (
    <div>
      <Navbar />
      <main className="pt-[calc(4rem+36px)] md:pt-[4rem] flex justify-center min-h-[calc(100vh-14rem)]">
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </main>
      <Footer />
    </div>
  );
}
