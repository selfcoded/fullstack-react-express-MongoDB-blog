import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./RightHeaderLayout.scss";

function RightHeaderLayout() {
  const param = useLocation();
  return (
    <div className="right-header-container">
      <div className="right-header">{param.pathname.split("/")[1]}</div>
      <div className="right-context-container">
        <Outlet />
      </div>
    </div>
  );
}

export default RightHeaderLayout;
