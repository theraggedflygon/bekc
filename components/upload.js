import React, { useState } from "react";
import { read, utils } from "xlsx";

const Upload = () => {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file === undefined || file === null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      console.log("HI!");
      const data = new Uint8Array(reader.result);
      const wb = read(data, { type: "array" });
      console.log(wb);
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
