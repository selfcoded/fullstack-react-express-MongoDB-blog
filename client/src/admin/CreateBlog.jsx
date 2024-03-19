import const_data from "../assets/data";
import { useNavigate } from "react-router-dom";
import "./CreateBlog.scss";
import { useEffect, useRef, useState } from "react";
import { current } from "@reduxjs/toolkit";
const CreateBlog = ({
  editFormData,
  handleFormData,
  isChecked,
  location,
  labelContent,
  type,
  setIsChecked,
}) => {
  const navigate = useNavigate();
  const checkboxRef = useRef([]);
  const popupRef = useRef([]);
  const [isShow, setIsShow] = useState(false);
  const categoryCheckbox = Object.values(const_data.categories.category).map(
    (category, index) => (
      <div className="category" key={category + index}>
        <label className="category-label" htmlFor="category">
          {category}
        </label>
        <input
          onChange={(e) => {
            handleFormData(e);
            setIsChecked({ checked: e.target.checked, key: category });
            hidePopup(e, index);
          }}
          name="categories"
          type="checkbox"
          className="checkbox"
          ref={(el) => (checkboxRef[index] = el)}
          value={category}
        />

        {
          // checkboxRef[index]?.checked &&
          Object.entries(const_data.categories).map(([key, value], i) => {
            if (key === category) {
              return (
                <div
                  style={{ display: "none" }}
                  ref={(el) => (popupRef[index] = el)}
                  className="sub-categories-container"
                  key={key + i}
                >
                  <div className="header">Sub Categories:</div>
                  {Object.entries(value).map(([subKey, subValue], j) => {
                    return (
                      <div className="sub-categories-wrapper" key={subKey + j}>
                        <label className="sub-category-key">{subKey}</label>

                        {subValue.map((item, i) => {
                          return (
                            <div
                              className="sub-category-value-wrapper"
                              key={item + i}
                            >
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
                      </div>
                    );
                  })}
                </div>
              );
            }
            return null;
          })
        }

        {/* {checkboxRef[index]?.checked && } */}
      </div>
    )
  );

  const subCategoryCheckbox = Object.entries(const_data.categories).map(
    ([key, value], i) => {
      const removeSpace = isChecked.key.includes(" ")
        ? isChecked.key.split(" ")[0]
        : isChecked.key;
      if (key === removeSpace) {
        return (
          <div className="sub-categories-container">
            <div className="sub-category-wrap" key={key + i}>
              <div className="header">Sub Categories:</div>
              {Object.entries(value).map(([subKey, subValue], j) => {
                return (
                  <div className="sub-categories-wrapper" key={subKey + j}>
                    <label className="sub-category-key">{subKey}</label>

                    {subValue.map((item, i) => {
                      return (
                        <div
                          className="sub-category-value-wrapper"
                          key={item + i}
                        >
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
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
      return null;
    }
  );
  const submitFormData = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/edit/${type.slice(0, -1)}`, {
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
  };
  const hidePopup = (e, index) => {
    if (e.target.checked) {
      for (let i = 0; i < 3; i++) {
        if (popupRef[i].style.display === "block") {
          popupRef[i].style.display = "none";
        }
      }
      switch (index) {
        case 0:
          popupRef[0].style.display = "block";
          break;
        case 1:
          popupRef[1].style.display = "block";
          break;
        case 2:
          popupRef[2].style.display = "block";
          break;
        default:
          popupRef[0].style.display = "block";
          break;
      }
    } else {
      popupRef[index].style.display = "none";
    }
  };
  const popupHiddenOut = (e) => {
    for (let i = 0; i < 3; i++) {
      if (popupRef[i].style.display === "block") {
        if (popupRef[i] && !popupRef[i].contains(e.target)) {
          popupRef[i].style.display = "none";
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", popupHiddenOut);
    return () => document.removeEventListener("mousedown", popupHiddenOut);
  }, [isShow]);
  return (
    <div className="form-container">
      <form onSubmit={(e) => submitFormData(e)} className="form">
        <div className="form-content">
          <div className="title-wrap">
            <label>title</label>
            <input
              onChange={(e) => handleFormData(e)}
              type="text"
              name="title"
            />
          </div>
          <div className="checkbox-container">
            <div className="categories">Categories: {categoryCheckbox}</div>

            {/* {isChecked.checked && (
              <div className="sub-categories-container">
                {subCategoryCheckbox}
              </div>
            )} */}
          </div>

          {location.indexOf("projects") !== -1 && (
            <div className="lower-wrap">
              <div className="intro-wrap">
                <label htmlFor="introduction">here is an intro</label>
                <input
                  type="text"
                  name="introduction"
                  onChange={(e) => handleFormData(e)}
                />
              </div>
              <div className="img-wrap">
                <span>here is an image</span>
                <input type="file" name="imgUrl" />
                <img src="123" alt="" />
              </div>
            </div>
          )}
          <div className="content-wrap">
            <label htmlFor="notes">{labelContent.label}</label>
            <textarea
              rows={8}
              name="notes"
              onChange={(e) => handleFormData(e)}
            />
          </div>
          {type === "projects" && (
            <div className="link-wrap">
              <label htmlFor="projectLink">project link</label>
              <input
                type="text"
                name="projectLink"
                onChange={(e) => handleFormData(e)}
              />
            </div>
          )}
          <div className="submit">
            <button>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
