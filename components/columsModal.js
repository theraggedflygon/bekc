import React, { useEffect, useState } from "react";

const ColumnsModal = ({ datasets, setModalShow }) => {
  const [headers, setHeaders] = useState();

  useEffect(() => {
    if (datasets.length !== 0) {
      setHeaders(datasets[0]);
    }
  }, [datasets]);

  const handleClick = (e) => {
    if (e.target.id === "modal-background") {
      setModalShow(false);
    }
  };

  return (
    <div
      className="bg-black inset-0 absolute bg-opacity-50 flex justify-center"
      id="modal-background"
      onClick={(e) => handleClick(e)}
    >
      <div className="max-w-lg w-full mx-auto pt-20 relative">
        <div className="bg-white p-6 rounded-lg">
          <div>Select Header Names</div>
        </div>
      </div>
    </div>
  );
};

export default ColumnsModal;
