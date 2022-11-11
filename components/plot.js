import React, { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

export const colors = [
  "rgba(234, 16, 16, {$A})",
  "rgba(68, 112, 214, {$A})",
  "rgba(68, 214, 115, {$A})",
  "rgba(226, 206, 53, {$A})",
  "rgba(226, 152, 53, {$A})",
  "rgba(53, 213, 226, {$A})",
  "rgba(159, 53, 226, {$A})",
  "rgba(34, 111, 22, {$A})",
  "rgba(27, 21, 88, {$A})",
  "rgba(88, 21, 21, {$A})",
];

const Plot = ({ datasets, xSeries, labels, setColors = [] }) => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [options, setOptions] = useState({});
  useEffect(() => {
    const newData = {
      labels: xSeries,
      datasets: [],
    };

    for (let i = 0; i < datasets.length; i++) {
      newData.datasets.push({
        label: labels[i],
        data: datasets[i],
        borderColor:
          setColors.length > i
            ? setColors[i].replace("{$A}", 0.8)
            : colors[i % 10].replace("{$A}", 0.8),
        backgroundColor:
          setColors.length > i
            ? setColors[i].replace("{$A}", 0.5)
            : colors[i % 10].replace("{$A}", 0.5),
      });
    }

    const newOptions = {
      maintainAspectRatio: false,
      scales: {
        y: {
          type: "linear",
          ticks: {
            callback: function (val, index) {
              return `${this.getLabelForValue(Number(val))}`;
            },
          },
        },
      },
    };
    setData(newData);
    setOptions(newOptions);
  }, [datasets, colors, labels, xSeries]);

  return <Line data={data} options={options} />;
};

export default Plot;
