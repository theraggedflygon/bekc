import React, { useEffect, useState } from "react";
import { read, utils } from "xlsx";
import Spinner from "./spinner";

const Upload = ({
  setDatasets,
  headers,
  setHeaders,
  setModalShow,
  clearModal,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (!loaded) {
      document.getElementById("file-input").value = null;
    }
  }, [loaded]);

  useEffect(() => {
    if (headers.length > 0) {
      setLoaded(true);
      setWaiting(false);
      setModalShow(true);
    }
  }, [headers, setModalShow]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file === undefined || file === null) {
      return;
    }
    setWaiting(true);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const data = new Uint8Array(reader.result);
      const wb = read(data, { type: "array" });
      const rows = utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]).split("\n");
      let i = 0;
      while (i < rows.length) {
        const row = rows[i].split(",");
        if (row[0] === "Cycle Nr.") {
          break;
        }
        i++;
      }
      const newHeaders = rows[i].split(",").filter((x) => x != "");
      const newDataset = Array.from(new Array(newHeaders.length), () => []);
      i++;
      while (i < rows.length) {
        const row = rows[i].split(",");
        if (row[0] == "") {
          break;
        }
        for (let j = 0; j < newHeaders.length; j++) {
          newDataset[j].push(Number.parseFloat(row[j]));
        }
        i++;
      }
      setDatasets(newDataset);
      setHeaders(newHeaders);
    };
  };

  const clearFile = () => {
    setDatasets([]);
    setLoaded(false);
    clearModal();
  };

  return (
    <div className="flex-none m-5">
      <div className="text-xl font-bold">Load Your Data File</div>
      <div className="align-middle">
        <input
          type="file"
          id="file-input"
          className="file:rounded-md file:bg-blue-500 file:p-1 file:border-0 file:text-lg file:text-white"
          onChange={(e) => handleFile(e)}
        ></input>
        {waiting && <Spinner message={`Please wait. Your data is loading.`} />}
        {loaded && (
          <button
            className="bg-red-500 p-2 text-white rounded"
            onClick={() => clearFile()}
          >
            Clear File
          </button>
        )}
        {loaded && (
          <button
            className="bg-green-500 ml-2 p-2 text-white rounded"
            onClick={() => setModalShow(true)}
          >
            Configure Dataset
          </button>
        )}
      </div>
    </div>
  );
};

export default Upload;
