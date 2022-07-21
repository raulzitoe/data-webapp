import { MapContainer, TileLayer } from "react-leaflet";
import Poi from "./Poi";
import axios from "axios";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

function Map({radioChoice}) {
  const [data, setData] = useState();
  const [statsData, setStatsData] = useState();
  const [eventsData, setEventsData] = useState();

  console.log(radioChoice);

  const fetchData = async () => {
    const response = await axios
      .get("https://gelatinous-crystalline-guppy.glitch.me/poi")
      .catch((err) => console.log(err));
      
    if (response) { 
      setData(response.data);
    }
  };

  const fetchStats = async () => {
    const response = await axios
      .get("https://gelatinous-crystalline-guppy.glitch.me/stats/sum")
      .catch((err) => console.log(err));

    if (response) {
      const responseData = response.data;

      console.log("Stats: ", responseData);
      setStatsData(responseData);
    }
  };

  const fetchEvents = async () => {
    const response = await axios
      .get("https://gelatinous-crystalline-guppy.glitch.me/events/sum")
      .catch((err) => console.log(err));

    if (response) {
      const responseData = response.data;

      console.log("Events: ", responseData);
      setEventsData(responseData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);

  if (data && statsData && eventsData) {
    return (
      <MapContainer
        style={{ height: "80vh", width: "100%" }}
        center={[43.6824, -79.4089]}
        zoom={9}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Poi data={data} radioChoice={radioChoice} eventsData={eventsData} statsData={statsData}/>
      </MapContainer>
    );
  }

  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
}

export default Map;
