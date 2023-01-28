import React from "react";

const Slider = ({ absMax, minVal, maxVal, setMinVal, setMaxVal }) => {
  const handleMin = () => {};

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full bg-red-300 justify-center flex ml-9 mr-1">
        <input type="range" className="w-full opacity-0"></input>
        <input type="range" className="w-full opacity-0"></input>

        <div class="relative z-10 h-2">
          <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>

          <div className="absolute z-20 top-0 bottom-0 rounded-md bg-blue-300"></div>

          <div className="absolute z-30 w-6 h-6 top-0 left-0 bg-blue-300 rounded-full -mt-2 -ml-1"></div>

          <div className="absolute z-30 w-6 h-6 top-0 right-0 bg-blue-300 rounded-full -mt-2 -mr-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
