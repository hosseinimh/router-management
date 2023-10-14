import React from "react";
import PortContainer from "../Port/PortContainer";

const RouterCard = ({ id, onMouseEnter, onMouseLeave }) => {
  return (
    <div className="router-card">
      <PortContainer />
      <img
        src="/assets/images/DCS-7010T-48.svg"
        alt=""
        onMouseEnter={() => onMouseEnter(id)}
        onMouseLeave={onMouseLeave}
      />
    </div>
  );
};

export default RouterCard;
