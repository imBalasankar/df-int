import React from "react";
import { Pie } from "react-chartjs-2";

const data = {
  labels: ["Active", "Non-Bench", "Bench"],
  datasets: [
    {
      data: [80, 72, 8],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};

export default function PieChart({ isDark }) {
  return (
    <div>
      <Pie
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
