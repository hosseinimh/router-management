import React, { useEffect, useState } from "react";

const PortContainer = () => {
  const [ports, setPorts] = useState([]);
  useEffect(() => {
    const arr = [];
    for (let i = 1; i <= 100; i++) {
      arr.push({
        id: i,
        x: (i % 50) * 5,
        y: i <= 50 ? 0 : 10,
        on: !!(Math.floor(Math.random() * 5) % 5 === 1),
      });
    }
    setPorts(arr);
  }, []);

  return (
    <div className="port-container">
      {ports.map((port) => (
        <div
          key={port.id}
          className={`port ${port.on ? "on" : ""}`}
          style={{ left: `${port.x}px`, top: `${port.y}px` }}
        ></div>
      ))}
    </div>
  );
};

export default PortContainer;
