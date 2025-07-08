"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const Chart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Books Borrowed",
        data: [3, 7, 4, 9, 5, 2, 6],
        fill: false,
        borderColor: "#f97316",
        backgroundColor: "#fb923c",
        tension: 0.4,
      },
    ],
  };

  return <Line data={data} />;
};

export default Chart;
