import React, { useState } from "react";
import Plot, { colors } from "./plot";
import Slider from "./common/slider";

const DataGraphs = ({ modalData, datasets, fits, slopes }) => {
  const generateGraphCol = (nCols, colNumber) => {
    return (
      <div className="w-1/6 h-[12rem]" key={`col-${colNumber}`}>
        {datasets.slice(3).map((ds, idx) => {
          if (idx % nCols === colNumber) {
            console.log(idx, colNumber, nCols);
            let dataset;
            let labels;
            const label = modalData.labels[idx];
            if (idx < fits.length) {
              dataset = [ds, fits[idx]];
              labels = [label, `${label}-Best Fit`];
            } else {
              dataset = [ds];
              labels = [label];
            }
            if (slopes[idx].x && slopes[idx].y) {
              dataset.push(
                datasets[1].map(
                  (ds) =>
                    slopes[idx].y + slopes[idx].velo * (ds - slopes[idx].x)
                )
              );
              labels.push(`${label}-Slope`);
            }
            return (
              <div key={`plot-${idx}`}>
                <Plot
                  xSeries={
                    modalData.settings.useTime ? datasets[1] : datasets[0]
                  }
                  datasets={dataset}
                  labels={labels}
                  setColors={[colors[idx], colors[1], colors[0]]}
                  showPoints={[1, 0, 0]}
                  showLine={[false, true, true]}
                  key={idx}
                ></Plot>
                {/* <Slider min={0} max={100} val={50} key={`slider-${idx}`} /> */}
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    modalData.labels.filter((l) => l !== "").length === datasets.length - 3 && (
      <div className="flex flex-row">
        <div className="w-1/2 h-[36rem]">
          {
            <Plot
              xSeries={modalData.settings.useTime ? datasets[1] : datasets[0]}
              datasets={datasets.slice(3)}
              labels={modalData.labels}
            ></Plot>
          }
        </div>
        {[...Array(3).keys()].map((colNum) => generateGraphCol(3, colNum))}
      </div>
    )
  );
};

export default DataGraphs;
