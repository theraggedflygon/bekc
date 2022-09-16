import React, { useEffect, useState } from "react";

const ColumnsModal = ({ headers, setModalShow }) => {
  const [settings, setSettings] = useState({ plotTemp: false, useTime: true });
  const [labels, setLabels] = useState([]);
  const [control, setControl] = useState([]);

  useEffect(() => {
    let newLength;
    if (headers.length > 3) {
      newLength = headers.length - 3;
    } else {
      newLength = 0;
    }
    setLabels(new Array(newLength).fill(""));
    setControl(new Array(newLength).fill(false));
    setSettings({ plotTemp: false, useTime: true });
  }, [headers]);

  const handleControl = (i) => {
    const newControl = [...control];
    const newLabels = [...labels];
    newControl[i] = !control[i];
    newLabels[i] = "";
    setControl(newControl);
    setLabels(newLabels);
  };

  const handleClose = (e) => {
    if (e.target.id === "modal-background" || e.target.id === "modal-center") {
      setModalShow(false);
    }
  };

  const handleChange = (e, i) => {
    const newLabels = [...labels];
    let newValue = e.target.value;
    console.log(newValue, newValue === "");
    if (!control[i]) {
      if (isNaN(newValue) || Number.parseFloat(newValue) < 0) {
        return;
      } else {
        if (newValue !== "") {
          newValue = Number.parseFloat(newValue);
        }
      }
    }
    newLabels[i] = newValue;
    setLabels(newLabels);
  };

  return (
    <div
      className="bg-black inset-0 absolute bg-opacity-50 flex justify-center"
      id="modal-background"
      onClick={(e) => handleClose(e)}
    >
      <div
        className="max-w-2xl w-full mx-auto pt-20 relative"
        id="modal-center"
      >
        <div className="bg-white p-6 rounded-lg">
          <div className="font-bold text-3xl">Configure Dataset</div>
          <div className="flex flex-row">
            <div className="w-1/2">
              <div className="text-center font-bold">Set Concentrations</div>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th>Column</th>
                    <th>Control?</th>
                    <th>Label</th>
                  </tr>
                </thead>
                <tbody>
                  {headers.slice(3).map((colName, idx) => {
                    return (
                      <tr className="border border-b-1 border-gray-200">
                        <td className="border border-l-1 pl-2 border-gray-200">
                          {colName}
                        </td>
                        <td className="text-center border border-r-1 border-gray-200">
                          <input
                            type="checkbox"
                            value={control[idx]}
                            onClick={() => handleControl(idx)}
                          ></input>
                        </td>
                        <td className="pr-1 pl-1 justify-right">
                          {!control[idx] ? (
                            <input
                              type="text"
                              value={labels[idx]}
                              onChange={(e) => handleChange(e, idx)}
                              placeholder="Enter Concentration (μM)"
                              min="0"
                              className="w-full text-right"
                            ></input>
                          ) : (
                            <input
                              type="text"
                              value={labels[idx]}
                              onChange={(e) => handleChange(e, idx)}
                              placeholder="Enter Control Label"
                              min="0"
                              className="w-full text-right"
                            ></input>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="w-1/2">
              <div className="text-center font-bold">Settings</div>
              <div className="pl-2">
                <div className="font-bold">Graph Temperature?</div>

                <div className="font-bold">Set Independent Variable:</div>
                <div className="flex flex-col">
                  <input type="radio"></input>
                  <input type="radio"></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnsModal;
