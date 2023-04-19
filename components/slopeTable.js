import React from "react";

const SlopeTable = ({ slopes }) => {
  return (
    <table className="table-auto w-1/4 ml-5 mb-5 mr-5">
      <thead>
        <tr>
          <th>Concentration (μM)</th>
          <th>Max Velocity</th>
          <th>% Activity</th>
        </tr>
      </thead>
      <tbody>
        {slopes.map((s, idx) => {
          let colorStr = "";
          if (isNaN(s.conc) || s.conc === 0) {
            colorStr = "lightGray";
          }
          return (
            <tr
              key={`tr-${idx}`}
              className="text-center"
              style={{ "background-color": colorStr }}
            >
              <td className="border border-black">{s.conc}</td>
              <td className="border border-black">{s.velo}</td>
              <td className="border border-black">{s.percentMax}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SlopeTable;
