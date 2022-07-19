import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Outlet, Link } from "react-router-dom";
import NavBar from "./NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
