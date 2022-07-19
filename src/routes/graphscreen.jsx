import CardHeader from "react-bootstrap/esm/CardHeader";
import GraphDaily from "../components/GraphDaily";
import GraphHourly from "../components/GraphHourly";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function GraphScreen() {
  const [userChoice, setUserChoice] = useState("stats");

  return (
    <div className="bg-primary p-2">
      <div className="text-center m-4">
        <Button className="bg-dark me-4" onClick={() => setUserChoice("stats")}>
          Statistics
        </Button>
        <Button
          className="bg-dark ms-4"
          onClick={() => setUserChoice("events")}
        >
          Events
        </Button>
      </div>

      {userChoice === "stats" && (
        <div>
          <Card className="shadow-lg m-1 p-5 mx-auto w-75">
            <Card.Title className="text-center">Stats - Daily</Card.Title>
            <GraphDaily />
            <Card.Body className="text-center"> Daily statistics</Card.Body>
          </Card>

          <Card className="shadow-lg m-5 p-5 mx-auto w-75">
            <Card.Title className="text-center">Stats - Daily</Card.Title>
            <GraphHourly />
            <Card.Body className="text-center"> Daily statistics</Card.Body>
          </Card>
        </div>
      )}

      {userChoice === "events" && <div><h1>Events</h1></div>}
    </div>
  );
}
