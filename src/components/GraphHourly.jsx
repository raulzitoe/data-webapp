import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import "chartjs-adapter-moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

function GraphHourly() {
  const [stats, setStats] = useState();
  const [events, setEvents] = useState();
  const [startDate, setStartDate] = useState(new Date("2016-01-01T23:35:01"));
  const [endDate, setEndDate] = useState(new Date("2017-08-18T21:11:54"));

  const fetchStats = async () => {
    const response = await axios
      .get("https://gelatinous-crystalline-guppy.glitch.me/stats/hourly")
      .catch((err) => console.log(err));

    if (response) {
      const responseData = response.data;

      console.log("Stats: ", responseData);
      setStats(responseData);
    }
  };

  const fetchEvents = async () => {
    const response = await axios
      .get("https://gelatinous-crystalline-guppy.glitch.me/events/hourly")
      .catch((err) => console.log(err));

    if (response) {
      const responseData = response.data;

      console.log("Events: ", responseData);
      setEvents(responseData);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchEvents();
  }, []);

  const filterDate = (x) =>
    dateWithHours(x.hour, new Date(x.date)) >= startDate &&
    dateWithHours(x.hour, new Date(x.date)) <= endDate;

  function dateWithHours(numOfHours, date) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
  }

  if (stats && events) {
    var data = {
      datasets: [
        {
          label: "Impressions",
          data: stats
            .filter((value) => filterDate(value))
            .map((x) => ({
              x: dateWithHours(x.hour, new Date(x.date)),
              y: x.impressions,
            })),
          backgroundColor: ["red"],
          borderColor: "red",
          borderWidth: 1,
          yAxisID: "y",
          pointStyle: "rect",
          tension: 0.2,
        },
        {
          label: "Clicks",
          data: stats
            .filter((value) => filterDate(value))
            .map((x) => ({
              x: dateWithHours(x.hour, new Date(x.date)),
              y: x.clicks,
            })),
          backgroundColor: ["blue"],
          borderColor: "blue",
          borderWidth: 1,
          yAxisID: "y1",
          pointStyle: "triangle",
          tension: 0.2,
        },
        {
          label: "Revenue",
          data: stats
            .filter((value) => filterDate(value))
            .map((x) => ({
              x: dateWithHours(x.hour, new Date(x.date)),
              y: x.revenue,
            })),
          backgroundColor: ["green"],
          borderColor: "green",
          borderWidth: 1,
          yAxisID: "y2",
          tension: 0.2,
        },
        {
          label: "Events",
          data: events
            .filter((value) => filterDate(value))
            .map((x) => ({
              x: dateWithHours(x.hour, new Date(x.date)),
              y: x.events,
            })),
          backgroundColor: ["black"],
          borderColor: "black",
          borderWidth: 1,
          yAxisID: "y3",
          pointStyle: "star",
          tension: 0.2,
        },
      ],
    };

    console.log(data);

    const chartOptions = {
      type: "line",
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
          mode: "x",
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
              hour: "DD/MM/YYYY ha",
              day: "DD/MM/YYYY ha",
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
          grid: {
            drawOnChartArea: false,
          },
        },
        y1: {
          type: "linear",
          title: {
            display: true,
            text: "Clicks",
          },
          display: true,
          position: "left",
          grid: {
            drawOnChartArea: false,
          },
        },
        y2: {
          type: "linear",
          title: {
            display: true,
            text: "Revenue",
          },
          display: true,
          position: "left",
          grid: {
            drawOnChartArea: false,
          },
        },
        y3: {
          type: "linear",
          title: {
            display: true,
            text: "Events",
          },
          display: true,
          position: "left",
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    };

    const handleStartDateChange = (newValue) => {
      setStartDate(newValue);
    };

    const handleEndDateChange = (newValue) => {
      setEndDate(newValue);
    };

    return (
      <div className="p-1">
          <Line data={data} options={chartOptions} />
          <div className="w-50 mx-auto pt-3">
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
                <DateTimePicker
                  label="Start"
                  value={startDate}
                  onChange={handleStartDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                  label="End"
                  value={endDate}
                  onChange={handleEndDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </div>
      </div>
    );
  }

  return (
    <div className="mx-auto m-5">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default GraphHourly;
