import React from "react";
import {
  Chart as ChartJ,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // 1. Import Filler plugin
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJ.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
const plugin = {
  id: "custom_canvas_background_color",
  beforeDatasetsDraw: (chart, args, options) => {
    const {
      ctx,
      chartArea: { top, width, height },
      scales: { x }
    } = chart;

    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "rgba(251,245,181, 0.6)";

    const newWidth = x._gridLineItems[1].x1 - x._gridLineItems[0].x1;

    if (options.fullW) {
      ctx.fillRect(x._gridLineItems[0].x1, top, newWidth, height);
    } else {
      ctx.fillRect(x._gridLineItems[0].x1, top, width, height);
    }
    ctx.restore();
  },
  defaults: {
    ww: 120
  }
};
ChartJ.register(plugin);

export const Lump = () => {
  const data = {
    labels: ["75", "80", "85", "90"],
    datasets: [
      {
        label: "With",
        data: [800, 900, 1200, 2500],
        backgroundColor: "rgb(155,164,179)",
        borderWidth: 1
      },
      {
        label: "Without",
        data: [2600, 2900, 3000, 3500],
        backgroundColor: "rgb(23,106,120)",
        borderWidth: 1
      }
    ]
  };

  const options = {
    // options.plugins.custom_canvas_background_color.color
    plugins: {
      custom_canvas_background_color: {
        color: "red",
        fullW: false,
        ww: 0
      }
    },
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        display: true,
        ticks: {
          beginAtZero: false
        }
      },
      x: {
        display: true,
        grid: {
          display: false
        }
      }
    }
  };
  return (
    <div>
      <Bar data={data} options={options} plugins={plugin} />
    </div>
  );
};
