import { useEffect, useState } from "react";
import axios from "axios";

export default function TableScreen() {
    const [events, setevents] = useState([]);
  
    const fetchEvents = async () => {
      const response = await axios
        .get("https://gelatinous-crystalline-guppy.glitch.me/events/hourly")
        .catch((err) => console.log(err));
  
      if (response) {
        const events = response.data;
  
        console.log("Events: ", events);
        setevents(events);
      }
    }

    useEffect(() => {
      fetchEvents();
    }, [])
    
  
  
  return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Table Screen</h2>
      </main>
    );
  }