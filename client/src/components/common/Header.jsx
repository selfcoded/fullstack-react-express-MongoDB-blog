import React from "react";
import const_data from "../../assets/data";
import { NavLink } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const menuItem = Object.values(const_data.header);
  const menuTab = menuItem.map((item, i) => (
    <div className="item" key={item[0] + i}>
      <NavLink to={`/${item[0] === "home" ? "" : item[0]}`}>
        {item[0].indexOf("blog") !== -1
          ? item[0].slice(item[0].indexOf("/") + 1)
          : item[0]}
      </NavLink>
    </div>
  ));
  return (
    <div className="header">
      <div className="header-container">{menuTab}</div>
    </div>
  );
};

export default Header;
