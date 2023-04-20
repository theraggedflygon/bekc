import React, { useState, useEffect } from "react";
import Plot, { colors } from "./plot";
import { fitLogistic, evalLogistic, getMaxSlope } from "../scripts/curveFit";

const SlopeGraph = ({ slopes }) => {
  const [graphSlopes, setGraphSlopes] = useState([]);
  const [fit, setFit] = useState([]);

  useEffect(() => {
    const newSlopes = slopes.filter((s) => !(isNaN(s.conc) || s.conc === 0));
    newSlopes.sort((s1, s2) => (s1.conc > s2.conc ? 1 : -1));

    const logXValues = newSlopes
      .map((s) => s.conc)
      .map((s) => Math.log(s) / Math.log(10));
    const logFit = fitLogistic(
      logXValues,
      newSlopes.map((s) => s.percentMax * 100)
    );
    for (let i = 0; i < logXValues.length; i++) {
      console.log(logXValues[i], newSlopes[i].percentMax * 100);
    }
    const fitVals = evalLogistic(
      logFit.L,
      logFit.k,
      logFit.x0,
      logFit.D,
      logXValues
    );

    setGraphSlopes(newSlopes);
    setFit(fitVals);
  }, [slopes]);

  return (
    <div className="w-1/3">
      {
        <Plot
          xSeries={graphSlopes.map((s) => s.conc)}
          datasets={[graphSlopes.map((s) => s.percentMax * 100), fit]}
          labels={["Inhibited Activity By Concentrations", "Fit"]}
          useLogScale={true}
        ></Plot>
      }
    </div>
  );
};

export default SlopeGraph;
