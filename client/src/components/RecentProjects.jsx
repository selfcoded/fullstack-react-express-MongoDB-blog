import React, { useEffect } from "react";
import { useContentData } from "../hooks/hooks";
import SingleProject from "./SingleProject";
import "./RecentProjects.scss";

const RecentProjects = () => {
  const {
    loading,
    formData,
    setFormData,
    displayFormData,
    abortController,
    type,
    params,
  } = useContentData();
  useEffect(() => {
    displayFormData("projects");
    return () => abortController.abort();
  }, []);
  const sliceIndex =
    formData !== null && Object.values(formData).length < 3
      ? Object.values(formData).length
      : 3;
  const recentProjectsElem =
    formData !== null
      ? Object.values(formData)
          .slice(0, sliceIndex)
          .map((value, index) => {
            return (
              <div key={index + value._id}>
                <SingleProject value={value} />
              </div>
            );
          })
      : null;
  return <div className="recent-projects">{recentProjectsElem}</div>;
};

export default RecentProjects;
