import GraphDaily from "../components/GraphDaily";
import GraphHourly from "../components/GraphHourly";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function GraphScreen() {
  const [userChoice, setUserChoice] = useState("daily");

  return (
    <div className="bg-primary" style={{minHeight: "95vh"}}>
      <div className="text-center pt-3 pb-3">
        <Button className="bg-dark me-4" onClick={() => setUserChoice("daily")}>
          Daily
        </Button>
        <Button
          className="bg-dark ms-4"
          onClick={() => setUserChoice("hourly")}
        >
          Hourly
        </Button>
      </div>

      {userChoice === "daily" && (
        <div className="p-0 pb-5 ps-lg-5 pe-lg-5">
          <Card className="shadow-lg m-0 ms-lg-5 me-lg-5 p-0 p-lg-4">
            <Card.Title className="text-center">Graph - Daily</Card.Title>
            <GraphDaily />
            <Card.Body className="text-center"> Daily statistics</Card.Body>
          </Card>
        </div>
      )}

      {userChoice === "hourly" && (
        <div className="p-0 pb-5 ps-lg-5 pe-lg-5">
          <Card className="shadow-lg m-0 ms-lg-5 me-lg-5 p-0 p-lg-4">
            <Card.Title className="text-center">Graph - Hourly</Card.Title>
            <GraphHourly />
            <Card.Body className="text-center"> Hourly statistics</Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}
