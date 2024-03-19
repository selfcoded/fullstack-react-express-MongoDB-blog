import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import AdminContextProvider from "./AdminContext.js";
import RightContext from "./RightContext.jsx";
import "./AdminDashBoard.scss";
import { useLocation, Link } from "react-router-dom";

const AdminDashBoard = () => {
  const location = useLocation();
  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="right-provider">
        <AdminContextProvider>
          <RightContext />
        </AdminContextProvider>
      </div>
      {location.pathname.indexOf("user") === -1 &&
        location.pathname.indexOf("create") === -1 && (
          <div className="create-new">
            <button>
              <Link to={`${location.pathname}/create`}>Create new</Link>
            </button>
          </div>
        )}
    </div>
  );
};

export default AdminDashBoard;
