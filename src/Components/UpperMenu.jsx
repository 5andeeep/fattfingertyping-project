import React, { useState } from "react";
import { useTestMode } from "../Context/TestModeContext";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";

const UpperMenu = ({ countDown }) => {
  const { testTime, setTestTime } = useTestMode();

  const updateTime = (e) => {
    setTestTime(Number(e.target.id));
    localStorage.setItem("timer", JSON.stringify(e.target.id));
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="upperMenu">
      <div className="counter">{countDown}</div>
      <div className="modes">
        <div className="upperMenu-reset-btn" onClick={handleRestart}>
          <ReplayCircleFilledIcon />
        </div>
        <div
          className={testTime == 15 ? "selected-time time-mode" : "time-mode"}
          id={15}
          onClick={updateTime}
        >
          15s
        </div>
        <div
          className={testTime == 30 ? "selected-time time-mode" : "time-mode"}
          id={30}
          onClick={updateTime}
        >
          30s
        </div>
        <div
          className={testTime == 60 ? "selected-time time-mode" : "time-mode"}
          id={60}
          onClick={updateTime}
        >
          60s
        </div>
      </div>
    </div>
  );
};

export default UpperMenu;
