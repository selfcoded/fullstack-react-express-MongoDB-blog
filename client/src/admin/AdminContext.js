import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHandleChange, useContentData } from "../hooks/hooks";
import CreateBlog from "./CreateBlog";

export const AdminContext = createContext(null);

const AdminContextProvider = (props) => {
  const { editFormData, setEditFormData, handleFormData } = useHandleChange();
  const {
    loading,
    formData,
    setFormData,
    displayFormData,
    abortController,
    type,
    params,
  } = useContentData();
  const [isChecked, setIsChecked] = useState({ checked: false, key: "" });

  const location = useLocation().pathname;

  useEffect(() => {
    displayFormData();
    return () => abortController.abort();
  }, [location]);

  const labelContent =
    location.indexOf("notes") !== -1
      ? { label: "note content" }
      : { label: "project content" };
  return (
    <AdminContext.Provider
      value={{ formData, location, setFormData, type, labelContent, loading }}
    >
      {location !== "/admin/users" && location.indexOf("create") !== -1 && (
        <CreateBlog
          editFormData={editFormData}
          handleFormData={handleFormData}
          isChecked={isChecked}
          location={location}
          labelContent={labelContent}
          setIsChecked={setIsChecked}
          type={type}
        />
      )}
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
