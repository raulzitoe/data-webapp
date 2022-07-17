import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>EQ Works Webapp</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/eq-works-webapp/graph">Graph Screen</Link> |{" "}
        <Link to="/eq-works-webapp/table">Table Screen</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
