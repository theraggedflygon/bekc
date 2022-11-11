import React, { useState } from "react";
import Plot, { colors } from "./plot";
import { fitLogistic, evalLogistic } from "../scripts/curveFit";

const DataGraphs = ({ modalData, datasets }) => {
  const generateGraphCol = (nCols, colNumber) => {
    return (
      <div className="w-1/6 h-[12rem]">
        {datasets.slice(3).map((ds, idx) => {
          if (idx % nCols === colNumber) {
            // const fitParams = fitLogistic(
            //   modalData.settings.useTime ? datasets[1] : datasets[0],
            //   ds
            // );
            // console.log(fitParams, `FIT ${idx} IS DONE!`);
            return (
              <Plot
                xSeries={modalData.settings.useTime ? datasets[1] : datasets[0]}
                datasets={[ds]}
                labels={[modalData.labels[idx]]}
                setColors={[colors[idx]]}
                key={idx}
              ></Plot>
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
