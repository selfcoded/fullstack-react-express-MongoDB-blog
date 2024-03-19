import React from "react";
import "./home.scss";
import const_data from "../assets/data";
import RecentProjects from "../components/RecentProjects";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="welcome">
          <span className="title">.welcome</span>
          <p>{const_data.header.home[1].welcome}</p>
        </div>
        <div className="intro">
          <span className="title">.introduction</span>
          <p>{const_data.header.home[1].intro}</p>
        </div>
        <div className="recent-projects-container">
          <span className="title">
            .{const_data.header.home[1].recent_projects}
          </span>
          <RecentProjects />
        </div>
        <div className="experiences">
          <span className="title">.experiences</span>
          <p>{const_data.header.home[1].experiences}</p>
        </div>
        <div className="start">
          <h6 className="title">{const_data.header.home[1].start}</h6>
          <button>
            <Link to={"/contact"}>Contact me</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
