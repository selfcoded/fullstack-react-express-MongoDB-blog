import React, { useEffect, useState } from "react";
import const_data from "../assets/data";
import { useHandleChange } from "../hooks/hooks";
import { useParams, useNavigate } from "react-router-dom";

export const UpdateContext = ({
  formData,
  location,
  setFormData,
  type,
  labelContent,
}) => {
  const { editFormData, setEditFormData, handleFormData } = useHandleChange();
  const [isChecked, setIsChecked] = useState({ checked: false, key: "" });
  const params = useParams();
  const navigate = useNavigate();
  const categoryCheckbox = Object.values(const_data.categories.category).map(
    (category, index) => (
      <span key={category + index}>
        <label htmlFor="category">{category}</label>
        <input
          onChange={(e) => {
            handleFormData(e);
            setIsChecked({ checked: e.target.checked, key: category });
          }}
          name="categories"
          type="checkbox"
          value={category}
          defaultChecked={
            formData !== null &&
            formData.categories !== undefined &&
            formData.categories.indexOf(category) !== -1
              ? isChecked.checked
              : !isChecked.checked
          }
        />
      </span>
    )
  );

  const subCategoryCheckbox = Object.entries(const_data.categories).map(
    ([key, value], i) => {
      const removeSpace = isChecked.key.includes(" ")
        ? isChecked.key.split(" ")[0]
        : isChecked.key;
      if (key === removeSpace) {
        return (
          <div key={key + i}>
            <h2>Sub Categories:</h2>
            {Object.entries(value).map(([subKey, subValue], j) => {
              return (
                <div key={subKey + j}>
                  <label>{subKey}</label>
                  <span>
                    {subValue.map((item, i) => {
                      return (
                        <div key={item + i}>
                          <label>{item}</label>
                          <input
                            onChange={(e) => handleFormData(e)}
                            id={subKey}
                            name="subCategories"
                            type="checkbox"
                            value={item}
                          />
                        </div>
                      );
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        );
      }
      return null;
    }
  );
  const updateFormData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/update/${type.slice(0, -1)}/${params.id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });
      if (res.ok) {
        navigate(-1);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {JSON.stringify(formData)}
      {formData !== null && (
        <form onSubmit={(e) => updateFormData(e)}>
          <div>
            <div>
              <label>title</label>
              <input
                onChange={(e) => handleFormData(e)}
                type="text"
                name="title"
                defaultValue={formData.title || ""}
              />
            </div>
            Categories: {categoryCheckbox}
            <br />
            {subCategoryCheckbox}
            <br />
            {location.indexOf("projects") !== -1 && (
              <div>
                <div>
                  <label htmlFor="introduction">here is an intro</label>
                  <input
                    type="text"
                    name="introduction"
                    onChange={(e) => handleFormData(e)}
                    defaultValue={formData.introduction || ""}
                  />
                </div>
                <span>here is an image</span>
                {/* <input type="file" name="imgUrl" /> */}
                <img src="123" alt="" />
              </div>
            )}
            <div>
              <label htmlFor="notes">{labelContent.label}</label>
              <textarea
                name="notes"
                onChange={(e) => handleFormData(e)}
                defaultValue={formData.notes || ""}
              />
            </div>
            {type === "projects" && (
              <div>
                <label htmlFor="projectLink">project link</label>
                <input
                  type="text"
                  name="projectLink"
                  defaultValue={formData.projectLink || ""}
                  onChange={(e) => handleFormData(e)}
                />
              </div>
            )}
            <div>
              <button>Update</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
