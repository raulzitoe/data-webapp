import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";

function GraphDaily() {
  const [stats, setStats] = useState();
  const [events, setEvents] = useState();
  const [startDate, setStartDate] = useState(new Date("2017-01-01"));
  const [endDate, setEndDate] = useState(new Date("2017-01-15"));
  const baseUrl = "https://gelatinous-crystalline-guppy.glitch.me";
  const token = `${process.env.REACT_APP_API_KEY}/`;
  const dateUrl = `${moment(startDate).format("YYYY-MM-DD")}/${moment(
    endDate
  ).format("YYYY-MM-DD")}`;

  const { data: statsData } = useQuery(["statsDaily", startDate, endDate], () =>
    axios
      .get(baseUrl + "/stats/daily/" + token + dateUrl)
      .then((res) => res.data)
  );
  const { data: eventsData } = useQuery(
    ["eventsDaily", startDate, endDate],
    () =>
      axios
        .get(baseUrl + "/events/daily/" + token + dateUrl)
        .then((res) => res.data)
  );

  useEffect(() => {
    if (typeof statsData !== "undefined") {
      setStats(statsData);
    }
    if (typeof eventsData !== "undefined") {
      setEvents(eventsData);
    }
  }, [statsData, eventsData]);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  if (stats && events) {
    var data = {
      datasets: [
        {
          label: "Impressions",
          data: stats.map((x) => ({
            x: new Date(x.date),
            y: x.impressions,
          })),

          backgroundColor: ["red"],
          borderColor: "red",
          borderWidth: 2,
          yAxisID: "y",
          pointStyle: "rect",
          tension: 0.2,
        },
        {
          label: "Clicks",
          data: stats.map((x) => ({
            x: new Date(x.date),
            y: x.clicks,
          })),
          backgroundColor: ["blue"],
          borderColor: "blue",
          borderWidth: 2,
          yAxisID: "y1",
          pointStyle: "triangle",
          tension: 0.2,
        },
        {
          label: "Revenue",
          data: stats.map((x) => ({
            x: new Date(x.date),
            y: x.revenue,
          })),
          backgroundColor: ["green"],
          borderColor: "green",
          borderWidth: 2,
          yAxisID: "y2",
          tension: 0.2,
        },
        {
          label: "Events",
          data: events.map((x) => ({
            x: new Date(x.date),
            y: x.events,
          })),
          backgroundColor: ["black"],
          borderColor: "black",
          borderWidth: 2,
          yAxisID: "y3",
          pointStyle: "star",
          tension: 0.2,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      stacked: false,
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
        tooltip: {
          usePointStyle: true,
        },
      },
      scales: {
        x: {
          type: "time",
          ticks: {
            maxRotation: 45,
            minRotation: 45,
          },
          time: {
            displayFormats: {
              hour: "DD/MM/YYYY",
              day: "DD/MM/YYYY",
            },
          },
        },
        y: {
          type: "linear",
          title: {
            display: true,
            text: "Impressions",
          },
          display: true,
          position: "left",
        },
        y1: {
          type: "linear",
          title: {
            display: true,
            text: "Clicks",
          },
          display: true,
          position: "left",
        },
        y2: {
          type: "linear",
          title: {
            display: true,
            text: "Revenue",
          },
          display: true,
          position: "left",
        },
        y3: {
          type: "linear",
          title: {
            display: true,
            text: "Events",
          },
          display: true,
          position: "left",
        },
      },
    };

    return (
        <>
          <div className="w-50 mx-auto pb-3">
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
                {(typeof statsData === "undefined" ||
                  typeof eventsData === "undefined") && (
                  <div className="mx-auto ps-3">
                    <Spinner animation="border" variant="primary" />
                  </div>
                )}
              </Stack>
            </LocalizationProvider>
          </div>
          <Line data={data} options={chartOptions} />
        </>
    );
  }
  return (
    <div className="mx-auto m-5">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default GraphDaily;
