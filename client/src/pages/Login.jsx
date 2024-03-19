import React, { useState } from "react";
import {
  initialState,
  loginStart,
  loginSuccess,
  loginFail,
} from "../redux/user/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

const Login = () => {
  const [formData, SetFormData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(initialState());
    dispatch(loginStart());
    const res = await fetch("/api/auth/admin/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = res.ok ? await res.json() : null;
    if (data !== null) {
      dispatch(loginSuccess());
      navigate("/admin");
    } else {
      dispatch(loginFail());
    }
  };
  const handleChange = (e) => {
    SetFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input onChange={handleChange} type="text" name="username" />
        <label htmlFor="password">Password</label>
        <input onChange={handleChange} type="password" name="password" />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
