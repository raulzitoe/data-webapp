import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
import { Slider } from "@mui/material";
import Spinner from "react-bootstrap/Spinner";

const minDistance = 10;

function GraphHourly() {
  const [stats, setStats] = useState([]);
  const [events, setEvents] = useState([]);
  const [endIndex, setEndIndex] = useState(0);
  const [value1, setValue1] = useState([20, 37]);

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

  useEffect(() => {
    setEndIndex(Object.keys(stats).length);
    setValue1([0, Object.keys(stats).length]);
    console.log("END INDEX: ", Object.keys(stats).length);
  }, [Object.keys(stats).length]);

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

  const myfilter = (index) => index >= value1[0] && index <= value1[1];

  if (stats && events) {
  
  var data = {
    labels: stats
      .filter((_, index) => myfilter(index))
      .map(
        (x) => new Date(x.date).toLocaleDateString("en-US") + " Hour: " + x.hour
      ),
    datasets: [
      {
        label: "Impressions",
        data: stats
          .filter((_, index) => myfilter(index))
          .map((x) => x.impressions),
        backgroundColor: [
          "red"
        ],
        borderColor: "red",
        borderWidth: 1,
        yAxisID: "y",
        pointStyle: "rect",
        tension: 0.2
      },
      {
        label: "Clicks",
        data: stats.filter((_, index) => myfilter(index)).map((x) => x.clicks),
        backgroundColor: [
          "blue"
        ],
        borderColor: "blue",
        borderWidth: 1,
        yAxisID: "y1",
        pointStyle: "triangle",
        tension: 0.2
      },
      {
        label: "Revenue",
        data: stats.filter((_, index) => myfilter(index)).map((x) => x.revenue),
        backgroundColor: [
          "green"
        ],
        borderColor: "green",
        borderWidth: 1,
        yAxisID: "y2",
        tension: 0.2
      },
      {
        label: "Events",
        data: events.filter((_, index) => myfilter(index)).map((x) => x.events),
        backgroundColor: [
          "black"
        ],
        borderColor: "black",
        borderWidth: 1,
        yAxisID: "y3",
        pointStyle: "star",
        tension: 0.2
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
      //   title: {
      //     display: true,
      //     text: "Stats - Hourly",
      //   },
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
        ticks: {
          maxRotation: 45,
          minRotation: 45,
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

  const handleChange1 = (_, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  return (
    <main style={{ padding: "1rem 0" }}>
      <div>
        <Line data={data} options={chartOptions} />
        <div className="w-50 mx-auto">
          <Slider
            getAriaLabel={() => "Minimum distance"}
            value={value1}
            max={endIndex}
            onChange={handleChange1}
            valueLabelDisplay="auto"
            disableSwap
          />
        </div>
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

export default GraphHourly;
