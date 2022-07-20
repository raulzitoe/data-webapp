import { MapContainer, TileLayer } from "react-leaflet";
import ShowCrimes from "./Poi";
import axios from "axios";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

function Map() {
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);

  const fetchData = async () => {
    const response = await fetch(
      "https://gelatinous-crystalline-guppy.glitch.me/poi"
    );
    const mydata = await response.json();
    console.log(mydata);
    setData(mydata);
    setSuccess(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (success) {
    return (
      <MapContainer
        style={{ height: "700px", width: "100%" }}
        center={[43.6824, -79.4089]}
        zoom={9}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ShowCrimes data={data} />
      </MapContainer>
    );
  }

  return (
    <div>
      <h1>failed</h1>
    </div>
  );
}

export default Map;
