import GraphDaily from "../components/GraphDaily";
import GraphHourly from "../components/GraphHourly";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function GraphScreen() {
  const [userChoice, setUserChoice] = useState("daily");

  return (
    <div className="bg-primary p-2">
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
        <div>
          <Card className="shadow-lg m-1 p-5 mx-auto w-75">
            <Card.Title className="text-center">Graph - Daily</Card.Title>
            <GraphDaily />
            <Card.Body className="text-center"> Daily statistics</Card.Body>
          </Card>
        </div>
      )}

      {userChoice === "hourly" && (
        <div className="min-w-100">
          <Card className="shadow-lg m-1 p-5 mx-auto w-75">
            <Card.Title className="text-center">Events - Daily</Card.Title>
            <GraphHourly />
            <Card.Body className="text-center"> Daily events</Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}
