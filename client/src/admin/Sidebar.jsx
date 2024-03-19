import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="link">
        <NavLink to="/admin/users" activeclassname="active">
          Users List
        </NavLink>
      </div>
      <div className="link">
        <NavLink to="/admin/projects" activeclassname="active">
          Projects List
        </NavLink>
      </div>
      <div className="link">
        <NavLink to="/admin/notes" activeclassname="active">
          Notes List
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
