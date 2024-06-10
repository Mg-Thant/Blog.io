import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
const Main = () => {
  return (
    <div>
      <section className="main">
        <NavBar />
        <Outlet />
      </section>
    </div>
  );
};

export default Main;
