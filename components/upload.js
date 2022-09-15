import React, { useState } from "react";
import { read, utils } from "xlsx";

const Upload = ({ setDatasets }) => {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file === undefined || file === null) {
      return;
    }
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
      const headers = rows[i].split(",").filter((x) => x != "");
      console.log(headers);
      setDatasets(new Array(headers.length));
      i++;
      while (i < rows.length) {
        const row = rows[i].split(",");
        if (row[0] == "") {
          break;
        }
        console.log(row);
        i++;
      }
    };
  };

  return (
    <div className="flex-none m-5">
      <div className="text-xl font-bold">Load Your Data File</div>
      <input
        type="file"
        className="file:rounded-md file:bg-blue-500 file:border-0 file:text-lg file:text-white"
        onChange={(e) => handleFile(e)}
      ></input>
    </div>
  );
};

export default Upload;
