import React from "react";
import {
  Chart as ChartJS,
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

ChartJS.register(
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
  beforeDraw: (chart, args, options) => {
    const {
      ctx,
      chartArea: { top, bottom, left, right, width, height },
      scales: { x, y }
    } = chart;

    const newWidth = x._gridLineItems[1].x1 - x._gridLineItems[0].x1;

    ctx.fillStyle = "rgba(251,245,181, 0.6)";
    ctx.fillRect(x._gridLineItems[0].x1, top, newWidth, height);

    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    /*  ctx.fillStyle = options.color;
    ctx.fillRect(0, 0, width, chart.height);
    */ ctx.restore();
  },
  defaults: {
    color: "lightGreen",
    fullW: false
  }
};

export const Multiple = () => {
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
    plugins: {
      custom_canvas_background_color: {
        color: "red",
        fullW: true,
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
      <Bar data={data} options={options} />
    </div>
  );
};
