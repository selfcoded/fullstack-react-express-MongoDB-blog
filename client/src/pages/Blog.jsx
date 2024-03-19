import React, { useEffect } from "react";
import const_data from "../assets/data.js";
import BlogContext from "../context/BlogContext.jsx";
import BlogContextProvider from "../context/BlogContext.js";

const Projects = () => {
  const { title, hint } = const_data.header.projects[1];
  return (
    <div>
      <div>
        <h3>{title}</h3>
        <p>{hint}</p>
      </div>
      <BlogContextProvider>
        <BlogContext />
      </BlogContextProvider>
    </div>
  );
};

export default Projects;
