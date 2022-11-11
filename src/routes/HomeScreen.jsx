import logo from "../../src/logo.svg";
import Card from "react-bootstrap/Card";

function HomeScreen() {
  return (
    <div className="bg-primary" style={{ height: "94vh" }}>
      <div className="row justify-content-center">
        <Card className="shadow-lg col-auto text-center mt-5 m-lg-5">
          
          <Card.Body className="">
            <Card.Title className="row justify-content-center">
            <img
              alt=""
              src={logo}
              width="50"
              height="50"
              className="d-inline-block col-auto"
            />
            <h1 className="col-auto">Data Visualization Web App</h1>
          </Card.Title>
            <Card.Title>Created by Raul Vieira</Card.Title>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default HomeScreen;
