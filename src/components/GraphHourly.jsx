import { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import "chartjs-adapter-moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import moment from "moment";
import { useQuery } from '@tanstack/react-query'

function GraphHourly() {
  const [startDate, setStartDate] = useState(new Date("2016-07-01"));
  const [endDate, setEndDate] = useState(new Date("2017-01-18"));
  const baseUrl = "https://gelatinous-crystalline-guppy.glitch.me/";
  const token = `${process.env.REACT_APP_API_KEY}/`;
  const dateUrl = `${moment(startDate).format('YYYY-MM-DD')}/${moment(endDate).format('YYYY-MM-DD')}`;

  const {data: stats, status: status1, error } = useQuery(['statsHourly', startDate, endDate], () => axios
  .get(baseUrl + "/stats/hourly/" + token + dateUrl).then((res) => (res.data)));
  const {data: events, status: status2 } = useQuery(['eventsHourly', startDate, endDate], () => axios
  .get(baseUrl + "/events/hourly/" + token + dateUrl).then((res) => (res.data)));

  const filterDate = (x) =>
    dateWithHours(x.hour, new Date(x.date)) >= startDate &&
    dateWithHours(x.hour, new Date(x.date)) <= endDate;

  function dateWithHours(numOfHours, date) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
  }

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

    return (
      <div className="p-1">
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
            </Stack>
          </LocalizationProvider>
        </div>
        <Line data={data} options={chartOptions} />
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
