import React from "react";
import { Link } from "react-router-dom";
import CategoriesElement from "../components/common/CategoriesElement";
import "./SingleNote.scss";

const SingleNote = ({ value }) => {
  return (
    <div className="single-container">
      <div className="upper-part">
        <h3>
          Title:
          <span>{value.title}</span>
          <span>
            Date:{value.createdAt.slice(0, value.createdAt.indexOf("T"))}
          </span>
        </h3>
        <div className="categories-container">
          <CategoriesElement value={value} />
        </div>
      </div>
      <div className="lower-part">
        <p>{value.notes}</p>
      </div>
    </div>
  );
};

export default SingleNote;
