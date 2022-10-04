import React, { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const Plot = ({ datasets, xSeries, labels }) => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [options, setOptions] = useState({});
  const colors = useMemo(
    () => [
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
    ],
    []
  );

  useEffect(() => {
    const newData = {
      labels: xSeries,
      datasets: [],
    };

    for (let i = 0; i < datasets.length; i++) {
      newData.datasets.push({
        label: labels[i],
        data: datasets[i],
        borderColor: colors[i % 10].replace("{$A}", 0.8),
        backgroundColor: colors[i % 10].replace("{$A}", 0.5),
      });
    }

    const newOptions = {
      scales: {
        y: {
          type: "linear",
        },
      },
    };
    setData(newData);
    setOptions(newOptions);
  }, [datasets, colors, labels, xSeries]);

  return <Line data={data} options={options} />;
};

export default Plot;
