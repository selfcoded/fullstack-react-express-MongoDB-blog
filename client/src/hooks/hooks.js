import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export const handleSubmit = (e) => {
  e.preventDefault();
};

export const useHandleChange = () => {
  const [editFormData, setEditFormData] = useState(null);
  const [categories, setCategories] = useState("");
  const handleFormData = (e) => {
    let category = "";
    let subCategories = null;

    if (e.target.name === "categories") {
      const value =
        e.target.value.indexOf(" ") !== -1
          ? e.target.value.split(" ").join("_")
          : e.target.value;
      if (e.target.checked) {
        category = value;
        setCategories(value);
      } else {
        delete editFormData[
          e.target.value.indexOf(" ") !== -1
            ? e.target.value.split(" ").join("_")
            : e.target.value
        ];
        const i = editFormData.categories.indexOf(e.target.value);
        if (i !== -1) {
          editFormData.categories.splice(i, 1);
        }
      }
    }
    if (e.target.name === "subCategories") {
      if (e.target.checked) {
        subCategories = {
          ...editFormData[categories],
          [e.target.id]:
            editFormData !== null &&
            editFormData.hasOwnProperty(categories) &&
            editFormData[categories].length !== 0 &&
            editFormData[categories][e.target.id] !== undefined
              ? [...editFormData[categories][e.target.id], e.target.value]
              : [e.target.value],
        };
      } else {
        const i = editFormData[categories][e.target.id].indexOf(e.target.value);
        if (editFormData[categories][e.target.id]) {
          editFormData[categories][e.target.id].splice(i, 1);
        }
      }
    }
    if (e.target.name !== "categories" && e.target.name !== "subCategories") {
      setEditFormData({
        ...editFormData,
        [e.target.name]: e.target.value,
      });
    } else if (category !== "" && e.target.name === "categories") {
      setEditFormData({
        ...editFormData,
        categories:
          editFormData !== null &&
          editFormData.hasOwnProperty("categories") &&
          editFormData.categories.indexOf(category) === -1
            ? [...editFormData.categories, category]
            : [category],
      });
    } else if (e.target.name === "subCategories") {
      setEditFormData({
        ...editFormData,
        [categories]: subCategories,
      });
    }
  };
  return { editFormData, setEditFormData, handleFormData };
};

export const useContentData = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const location = useLocation().pathname;
  const params = useParams();
  const abortController = new AbortController();
  const type =
    location.indexOf("/notes") !== -1
      ? "notes"
      : location.indexOf("/projects") !== -1
      ? "projects"
      : "users";
  const displayFormData = async (blogType) => {
    setLoading(true);
    const fetchUrl =
      params !== null && params.hasOwnProperty("id")
        ? `/api/${blogType === undefined ? type : blogType}/${params.id}`
        : `/api/${blogType === undefined ? type : blogType}`;
    try {
      const res = await fetch(fetchUrl, {
        signal: abortController.signal,
      });
      const data = res.ok ? await res.json() : null;
      setLoading(false);
      setFormData(data);
    } catch (error) {}
  };
  return {
    loading,
    formData,
    setFormData,
    displayFormData,
    abortController,
    type,
    params,
  };
};

export const useContactForm = () => {
  const [formData, setFormData] = useState(null);
  const [isEmpty, setIsEmpty] = useState({
    name: true,
    email: true,
    company: true,
    subject: true,
    message: true,
  });
  const handleContactFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const checkIsEmpty = (e) => {
    setIsEmpty({
      ...isEmpty,
      [e.target.name]: e.target.value.trim().length > 0 ? false : true,
    });
  };
  return {
    formData,
    setFormData,
    handleContactFormData,
    isEmpty,
    checkIsEmpty,
  };
};
