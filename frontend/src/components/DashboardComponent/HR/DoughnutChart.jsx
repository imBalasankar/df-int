import React from "react";
import { Doughnut } from "react-chartjs-2";

const data = {
  labels: ["Software Engineers", "QA Engineers", "Project Managers"],
  datasets: [
    {
      data: [38, 38, 4],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};

export default function DoughnutChart({ isDark }) {
  return (
    <div>
      <Doughnut
        data={data}
        height={280}
        options={{
          maintainAspectRatio: false,
          legend: {
            labels: {
              fontColor: isDark ? "white" : "black"
            }
          }
        }}
      />
    </div>
  );
}
