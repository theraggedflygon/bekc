import React, { useState } from "react";
import Plot, { colors } from "./plot";
import Slider from "./common/slider";

const DataGraphs = ({ modalData, datasets, fits }) => {
  const generateGraphCol = (nCols, colNumber) => {
    return (
      <div className="w-1/6 h-[12rem]" key={`col-${colNumber}`}>
        {datasets.slice(3).map((ds, idx) => {
          if (idx % nCols === colNumber) {
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
            return (
              <div>
                <Plot
                  xSeries={
                    modalData.settings.useTime ? datasets[1] : datasets[0]
                  }
                  datasets={dataset}
                  labels={labels}
                  setColors={[colors[idx]]}
                  showPoints={[1, 0]}
                  showLine={[false, true]}
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
