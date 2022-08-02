import { MapContainer, TileLayer } from "react-leaflet";
import Poi from "./Poi";
import axios from "axios";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function Map({ radioChoice }) {
  // const [data, setData] = useState();
  const [statsData, setStatsData] = useState();
  const [eventsData, setEventsData] = useState();
  const [startDate, setStartDate] = useState(new Date("2017-01-01"));
  const [endDate, setEndDate] = useState(new Date("2017-01-15"));
  const [showAlert, setShowAlert] = useState(false);
  const baseUrl = "https://gelatinous-crystalline-guppy.glitch.me/";
  const token = `${process.env.REACT_APP_API_KEY}/`;
  const dateUrl = `${moment(startDate).format("YYYY-MM-DD")}/${moment(
    endDate
  ).format("YYYY-MM-DD")}`;

  const { data: events } = useQuery(["eventsSum", startDate, endDate], () =>
    axios
      .get(baseUrl + "/events/sum/" + token + dateUrl)
      .then((res) => res.data)
  );
  const { data: stats } = useQuery(["statsSum", startDate, endDate], () =>
    axios.get(baseUrl + "/stats/sum/" + token + dateUrl).then((res) => res.data)
  );
  const { data: poi } = useQuery(["poi"], () =>
    axios.get(baseUrl + token + "poi").then((res) => res.data)
  );

  useEffect(() => {
    if (typeof stats !== "undefined") {
      setStatsData(stats);
    }
    if (typeof events !== "undefined") {
      setEventsData(events);
    }
  }, [stats, events]);

  const handleStartDateChange = (newValue) => {
    if (newValue < endDate) {
      setStartDate(newValue);
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };

  const handleEndDateChange = (newValue) => {
    if (startDate < newValue) {
      setEndDate(newValue);
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };

  if (poi && statsData && eventsData) {
    return (
      <>
        <div className="w-50 mx-auto mb-4">
          {showAlert && (
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              <Alert.Heading>Wrong date option</Alert.Heading>
              <p>End date needs to be 1+ days after Start date.</p>
            </Alert>
          )}

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Stack
              direction={{
                xs: "column",
                sm: "column",
                md: "row",
                lg: "row",
                xl: "row",
              }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <DesktopDatePicker
                label="Start"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="End"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              {(typeof eventsData === "undefined" ||
                typeof poi === "undefined" ||
                typeof statsData === "undefined") && (
                <div className="mx-auto ps-3">
                  <Spinner animation="border" variant="primary" />
                </div>
              )}
            </Stack>
          </LocalizationProvider>
        </div>
        <MapContainer
          style={{ height: "80vh", width: "100%" }}
          center={[43.6824, -79.4089]}
          zoom={9}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Poi
            data={poi}
            radioChoice={radioChoice}
            eventsData={eventsData}
            statsData={statsData}
          />
        </MapContainer>
      </>
    );
  }

  return (
    <div className="mx-auto m-5 text-center">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default Map;
