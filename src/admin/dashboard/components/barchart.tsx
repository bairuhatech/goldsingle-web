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
function DashBoardBarchart() {
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
  const dataset = [10, 20, 30, 40, 50, 60, 70, 80];
  return (
    <>
      <div className="dashBoardBarchart-Box1">
        <div className="dashBoardBarchart-Txt1"> Yearly Users</div>
        <BarChart
          className="dashBoardBarchart-Box2"
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
    </>
  );
}

export default DashBoardBarchart;
