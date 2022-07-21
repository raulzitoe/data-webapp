import GraphDaily from "../components/GraphDaily";
import GraphHourly from "../components/GraphHourly";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function GraphScreen() {
  const [userChoice, setUserChoice] = useState("daily");

  return (
    <div className="bg-primary pt-1">
      <div className="text-center m-4">
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
        <div className="p-0 pb-5 p-lg-5">
          <Card className="shadow-lg m-0 m-lg-5 p-0 p-lg-4">
            <Card.Title className="text-center">Graph - Daily</Card.Title>
            <GraphDaily />
            <Card.Body className="text-center"> Daily statistics</Card.Body>
          </Card>
        </div>
      )}

      {userChoice === "hourly" && (
        <div className="p-0 pb-5 p-lg-5">
          <Card className="shadow-lg m-0 m-lg-5 p-0 p-lg-4">
            <Card.Title className="text-center">Events - Hourly</Card.Title>
            <GraphHourly />
            <Card.Body className="text-center"> Hourly events</Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}
