import TableEvents from "../components/TableEvents";
import TableStats from "../components/TableStats";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function TableScreen() {
  const [userChoice, setUserChoice] = useState("events");

  return (
    <div className="bg-primary" style={{minHeight: "95vh"}}>
      <div >
        <div className="text-center pt-3">
          <Button
            className="bg-dark me-4"
            onClick={() => setUserChoice("events")}
          >
            Events
          </Button>
          <Button
            className="bg-dark ms-4"
            onClick={() => setUserChoice("stats")}
          >
            Stats
          </Button>
        </div>
      </div>
      <div className="pt-3 pb-5 ps-lg-5 pe-lg-5">
        {userChoice === "events" && <TableEvents />}
        {userChoice === "stats" && <TableStats />}
      </div>
    </div>
  );
}

export default TableScreen;
