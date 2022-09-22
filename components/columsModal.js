import React, { useEffect, useState } from "react";

const ColumnsModal = ({ headers, setModalShow, modalData, setModalData }) => {
  const [settings, setSettings] = useState({ plotTemp: false, useTime: true });
  const [serialVals, setSerialVals] = useState({ start: 1000, factor: 2 });
  const [labels, setLabels] = useState([]);
  const [control, setControl] = useState([]);

  useEffect(() => {
    let newLength;
    if (headers.length > 3) {
      newLength = headers.length - 3;
    } else {
      newLength = 0;
    }
    if (modalData.labels.length === 0) {
      setLabels(new Array(newLength).fill(""));
    } else {
      setLabels(modalData.labels);
    }
    if (modalData.control.length === 0) {
      setControl(new Array(newLength).fill(false));
    } else {
      setControl(modalData.control);
    }
    setSettings(modalData.settings);
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
      setModalData({ labels, control, settings });
    }
  };

  const handleChange = (e, i) => {
    const newLabels = [...labels];
    let newValue = e.target.value;
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

  const handleRadio = (field, newVal) => {
    const newSettings = { ...settings };
    newSettings[field] = newVal;
    setSettings(newSettings);
  };

  const handleSerialChange = (e, field) => {
    const newSerial = { ...serialVals };
    let newValue = e.target.value;
    if (isNaN(newValue)) {
      return;
    } else if (newValue === "") {
      newValue = 0;
    } else {
      newValue = Number.parseFloat(newValue);
      if (newValue < 0) {
        return;
      }
    }
    newSerial[field] = newValue;
    setSerialVals(newSerial);
  };

  const applySerial = () => {
    const { start, factor } = serialVals;
    console.log(start, factor);
    let current = start;
    const newLabels = [...labels];
    for (let i = 0; i < labels.length; i++) {
      if (labels[i] === "" && !control[i]) {
        newLabels[i] = current;
        current /= factor;
      }
    }
    setLabels(newLabels);
  };

  return (
    <div
      className="bg-black inset-0 absolute bg-opacity-50 flex justify-center"
      id="modal-background"
      onClick={(e) => handleClose(e)}
    >
      <div
        className="max-w-3xl w-full mx-auto pt-20 relative"
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
                      <tr
                        key={idx}
                        className="border border-b-1 border-gray-200"
                      >
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
                <div className="flex flex-col">
                  <div className="flex items-center mb-1">
                    <input
                      type="radio"
                      onChange={() => handleRadio("plotTemp", true)}
                      checked={settings.plotTemp}
                    ></input>
                    <label className="pl-2">Yes</label>
                  </div>
                  <div className="flex items-center mb-1">
                    <input
                      type="radio"
                      onChange={() => handleRadio("plotTemp", false)}
                      checked={!settings.plotTemp}
                    ></input>
                    <label className="pl-2">No</label>
                  </div>
                </div>

                <div className="font-bold">Set Independent Variable:</div>
                <div className="flex flex-col">
                  <div className="flex items-center mb-1">
                    <input
                      type="radio"
                      onChange={() => handleRadio("useTime", true)}
                      checked={settings.useTime}
                    ></input>
                    <label className="pl-2">Time</label>
                  </div>
                  <div className="flex items-center mb-1">
                    <input
                      type="radio"
                      onChange={() => handleRadio("useTime", false)}
                      checked={!settings.useTime}
                    ></input>
                    <label className="pl-2">Cycle Number</label>
                  </div>
                </div>
                <div className="font-bold">Add Serial Dilution</div>
                <div className="flex flex-col">
                  <div className="flex items-center mb-1">
                    <div>Start Conc. (μM)</div>
                    <input
                      type="text"
                      className="border border-gray-400 ml-2 w-20"
                      value={serialVals.start}
                      onChange={(e) => handleSerialChange(e, "start")}
                    ></input>
                  </div>
                  <div className="flex items-center mb-1">
                    <div>Dilution Factor</div>
                    <input
                      type="text"
                      className="border border-gray-400 ml-4 w-20"
                      value={serialVals.factor}
                      onChange={(e) => handleSerialChange(e, "factor")}
                    ></input>
                  </div>
                  <div className="flex justify-center h-full">
                    <button
                      className="bg-green-500 w-1/2 text-white rounded-lg p-2"
                      onClick={applySerial}
                    >
                      Add Serial Dilution
                    </button>
                  </div>
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
