import logo from "../../src/logo.svg";
import Card from "react-bootstrap/Card";

function HomeScreen() {
  return (
    <div className="bg-primary" style={{ height: "94vh" }}>
      <div className="row justify-content-center">
        <Card className="shadow-lg col-auto mx-auto text-center m-1 mt-5 m-lg-5">
          
          <Card.Body className="">
            <Card.Title className="row justify-content-center">
            <img
              alt=""
              src={logo}
              width="50"
              height="50"
              className="d-inline-block col-auto"
            />
            <h1 class="col-auto">Eq Works Web App</h1>
          </Card.Title>
            <Card.Title>Created by Raul Vieira</Card.Title>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default HomeScreen;
