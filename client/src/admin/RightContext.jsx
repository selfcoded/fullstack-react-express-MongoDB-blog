import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminContext.js";
import { UpdateContext } from "./UpdateContext.jsx";

const RightContext = () => {
  const { formData, location, setFormData, type, labelContent, loading } =
    useContext(AdminContext);
  const [mess, setMess] = useState("");
  const navigate = useNavigate();
  const deleteItem = async (id) => {
    const res = await fetch(`/api/${type}/delete/${id}`);
    if (res.ok) {
      const data = await res.json();
      setMess(data.message);
      const updatedData =
        type === "projects" ? data.updatedProjects : data.updatedNotes;
      setFormData(updatedData);
    } else {
      return;
    }
  };
  const updateItem = async (id) => {
    navigate(`/admin/${type}/update/${id}`);
  };
  const trElement =
    formData && Object.values(formData)
      ? Object.values(formData).map((item, i) => {
          return (
            <tr key={i + item._id}>
              {item.username && <td>{item.username}</td>}
              {item.email ? <td>{item.email}</td> : <td>{item.title}</td>}
              <td>{item.updatedAt.slice(0, item.updatedAt.indexOf("T"))}</td>
              <td>
                <button onClick={() => deleteItem(item._id)}>delete</button>
                <button onClick={() => updateItem(item._id)}>update</button>
              </td>
            </tr>
          );
        })
      : null;
  return (
    <>
      {location.indexOf("update") === -1 &&
        location.indexOf("create") === -1 &&
        formData !== null &&
        formData !== undefined && (
          <>
            {!loading && Object.keys(formData).indexOf("_id") === -1 ? (
              <>
                <div className="table">
                  <table>
                    <thead>
                      <tr>
                        {type === "users" && <th>Name</th>}
                        {type === "users" ? <th>Email</th> : <th>Title</th>}
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {trElement && trElement.length > 0 ? (
                      <tbody>{trElement}</tbody>
                    ) : (
                      <h4>there is no data</h4>
                    )}
                  </table>
                </div>
              </>
            ) : (
              <span>loading</span>
            )}
          </>
        )}

      {location.indexOf("create") === -1 &&
        location.indexOf("update") !== -1 && (
          <div>
            <UpdateContext
              formData={formData}
              location={location}
              setFormData={setFormData}
              type={type}
              labelContent={labelContent}
            />
          </div>
        )}
    </>
  );
};

export default RightContext;
