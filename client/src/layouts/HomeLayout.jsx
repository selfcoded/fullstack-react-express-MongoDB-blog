import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import "./HomeLayout.scss";

const HomeLayout = () => {
  return (
    <div className="home-layout">
      <div className="layout-container">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
