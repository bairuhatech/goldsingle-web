import { Bar as BarChart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Colors,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles.scss";
import React from "react";
function OverViewGraph() {
  const options = {
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 10, // Remove this line
        min: 0,
        // max: 200,
        ticks: {
          stepSize: 10, // Define the step size here
        },
      },
    },
  };
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Colors
  );
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "aug"];
  const dataset = [0, 0, 0, 0, 0, 0, 0, 0];
  return (
    <div className="DashboardPurschaseGrph-Box1">
      <div className="DashboardPurschaseGrph-Tx1">Yearly Orders</div>
      <BarChart
        className="DashboardPurschaseGrph-Box2"
        options={options}
        data={{
          labels: month,
          datasets: [
            {
              label: "data",
              data: dataset,
            },
          ],
        }}
      />
    </div>
  );
}

export default OverViewGraph;
