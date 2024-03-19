import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useContentData } from "../hooks/hooks";

export const BlogContext = createContext(null);

const BlogContextProvider = (props) => {
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
    displayFormData();
    return () => abortController.abort();
  }, [type]);

  return (
    <BlogContext.Provider value={{ formData, loading, type }}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;
