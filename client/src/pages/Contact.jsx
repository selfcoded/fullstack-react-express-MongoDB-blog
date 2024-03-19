import React from "react";
import const_data from "../assets/data";
import { useContactForm } from "../hooks/hooks";
import { useSubmitContactFormData } from "../utils/api.js";
import "./Contact.scss";

const Contact = () => {
  const { submitContactFormData } = useSubmitContactFormData();
  const contact = const_data.header.contact[1];
  const {
    formData,
    setFormData,
    handleContactFormData,
    isEmpty,
    checkIsEmpty,
  } = useContactForm();

  return (
    <div>
      <div className="contact-container">
        <h2 className="title">{contact.title}</h2>
        <form
          className="form"
          onSubmit={(e) => submitContactFormData(e, isEmpty, formData)}
        >
          <div className="input-container">
            <div className="input-item">
              <label htmlFor="name">{contact.form_data.name}</label>
              <input
                onChange={(e) => {
                  handleContactFormData(e);
                  checkIsEmpty(e);
                }}
                type="text"
                name="name"
              />
            </div>
            <div className="input-item">
              <label htmlFor="email">{contact.form_data.email}</label>
              <input
                onChange={(e) => {
                  handleContactFormData(e);
                  checkIsEmpty(e);
                }}
                type="email"
                name="email"
              />
            </div>
          </div>
          <div className="input-container">
            <div className="input-item">
              <label htmlFor="company">{contact.form_data.company}</label>
              <input
                onChange={(e) => {
                  handleContactFormData(e);
                  checkIsEmpty(e);
                }}
                type="text"
                name="company"
              />
            </div>
            <div className="input-item">
              <label htmlFor="subject">{contact.form_data.subject}</label>
              <input
                onChange={(e) => {
                  handleContactFormData(e);
                  checkIsEmpty(e);
                }}
                type="text"
                name="subject"
              />
            </div>
          </div>
          <div className="text-input">
            <label htmlFor="message">{contact.form_data.message}</label>
            <textarea
              rows={10}
              onChange={(e) => {
                handleContactFormData(e);
                checkIsEmpty(e);
              }}
              name="message"
            />
          </div>
          {Object.values(isEmpty).indexOf(true) !== -1 && (
            <p className="error">&#42;all the fields need to be filled in</p>
          )}
          <button
            disabled={
              Object.values(isEmpty).indexOf(true) === -1 ? false : true
            }
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
