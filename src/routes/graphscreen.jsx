import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";

export default function GraphScreen() {
  const [stats, setStats] = useState([]);

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

  var data = {
      labels: stats.map((x) => new Date(x.date).toLocaleDateString('en-US')),
      datasets: [
        {
          label: "Impressions",
          data: stats.map((x) => x.impressions),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 1,
          yAxisID: 'y',
          pointStyle: 'rect'
        },
        {
          label: "Clicks",
          data: stats.map((x) => x.clicks),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 1,
          yAxisID: 'y1',
          pointStyle: 'triangle'
        },
        {
          label: "Revenue",
          data: stats.map((x) => x.revenue),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 1,
          yAxisID: 'y2',
        }
      ]}

  useEffect(() => {
    fetchStats();
  }, []);
  
  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Stats - Daily'
      },
      legend: {
        labels: {
           usePointStyle: true
        }
     },
     tooltip: {
         usePointStyle: true
   },
    },
    scales: {
      x: {
        ticks: {
            maxRotation: 45,
            minRotation: 45
        }
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Impressions'
        },
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        title: {
          display: true,
          text: 'Clicks'
        },
        display: true,
        position: 'left',
      },
      y2: {
        type: 'linear',
        title: {
          display: true,
          text: 'Revenue'
        },
        display: true,
        position: 'left',
      },
    }
  }
  
  
  
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Graph Screen</h2>
      <div style={{ width: 700 }}>
        <Line data={data} options={chartOptions} />
      </div>
    </main>
  );
}
