import React from "react";
import "./CategoriesElement.scss";

const CategoriesElement = ({ value }) => {
  const categoriesElem = value.categories.map((category, index) => {
    return (
      <div className="category-container" key={index + category}>
        {value.hasOwnProperty(category) && (
          <>
            <span className="category-title">
              {category.indexOf("_") !== -1
                ? category.slice(0, category.indexOf("_"))
                : category}
            </span>
            <div className="sub-categories">
              <span className="sub-category">
                {Object.keys(value[category][0])}:
              </span>
              <div className="items">
                {Object.values(value[category][0])[0].map(
                  (subCategory, index) => {
                    return (
                      <span className="item" key={subCategory + index}>
                        {subCategory}
                      </span>
                    );
                  }
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  });
  return <>{categoriesElem}</>;
};

export default CategoriesElement;
