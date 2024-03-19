import React from "react";
import { Link } from "react-router-dom";
import "./SingleProject.scss";
import CategoriesElement from "../components/common/CategoriesElement";

const SingleProject = ({ value }) => {
  return (
    <div className="single-container">
      <div className="upper-part">
        <h3>
          Title:
          <span>{value.title}</span>
        </h3>
        <div className="categories-container">
          <CategoriesElement value={value} />
        </div>
        <p>introduction:{value.introduction}</p>
      </div>
      <div className="lower-part">
        <span>
          Date:{value.createdAt.slice(0, value.createdAt.indexOf("T"))}
        </span>
        <button>
          <Link to={value.projectLink}>Read more</Link>
        </button>
      </div>
    </div>
  );
};

export default SingleProject;
