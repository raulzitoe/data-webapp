import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

function GraphDaily() {
  const [stats, setStats] = useState();
  const [events, setEvents] = useState();

  const fetchStats = async () => {
    const response = await axios
      .get("https://gelatinous-crystalline-guppy.glitch.me/stats/daily")
      .catch((err) => console.log(err));

    if (response) {
      const responseData = response.data;

      console.log("Stats: ", responseData);
      setStats(responseData);
    }
  };

  const fetchEvents = async () => {
    const response = await axios
      .get("https://gelatinous-crystalline-guppy.glitch.me/events/daily")
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
      },
    };

    return (
      <main style={{ padding: "1rem 0" }}>
        <div>
          <Line data={data} options={chartOptions} />
        </div>
      </main>
    );
  }

  return (
    <div className="mx-auto m-5">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default GraphDaily;
