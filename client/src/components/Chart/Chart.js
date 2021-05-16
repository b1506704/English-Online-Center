import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js";

const randomInt = () => Math.floor(Math.random() * (10 - 1 + 1)) + 1;

const ProgressChart = ({type, labels, label, data, scales, backgroundColor, borderColor, borderWidth}) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const chartConfig = {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
    //   scales: {
    //     yAxes: [
    //       {
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }
    //     ]
    //   }
        scales: scales
    }
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  const refresh = () => {
    const data = [
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt()
    ];
    updateDataset(0, data);
  };

  return (
    <div className="chart_container">
      {/* <button className="refresh_button shadow" onClick={refresh}>Refresh</button> */}
      <canvas ref={chartContainer} />
    </div>
  );
};

export default ProgressChart;
