import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Root() {
  return (
    <div>
      <Navbar />
      <main className="pt-16 flex justify-center min-h-[calc(100vh-14rem)] bg-base-100">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
