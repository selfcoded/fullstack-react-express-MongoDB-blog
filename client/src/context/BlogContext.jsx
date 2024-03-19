import React, { useContext } from "react";
import { BlogContext } from "./BlogContext";
import SingleProject from "../components/SingleProject";
import SingleNote from "../components/SingleNote";
import "./BlogContext.scss";

const ProjectsContext = () => {
  const { formData, loading, type } = useContext(BlogContext);
  const blogHome =
    formData !== null
      ? Object.values(formData).map((value, index) => {
          return (
            <div key={index + value._id}>
              {type === "projects" ? (
                <SingleProject value={value} />
              ) : (
                <SingleNote value={value} />
              )}
            </div>
          );
        })
      : null;
  return (
    <div
      className={type === "projects" ? "blog-container" : "blog-note-container"}
    >
      {!loading ? blogHome : <h4>is loading...</h4>}
    </div>
  );
};

export default ProjectsContext;
