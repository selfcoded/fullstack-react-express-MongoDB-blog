import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Home from "../src/pages/Home";
import RightHeaderLayout from "./layouts/RightHeaderLayout";
import Blog from "./pages/Blog.jsx";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AdminDashBoard from "./admin/AdminDashBoard";
import RightContext from "./admin/RightContext";
import BlogContext from "./context/BlogContext.jsx";
import UpdateContext from "./admin/UpdateContext.jsx";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<HomeLayout />}>
        <Route element={<RightHeaderLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="blog" element={<Blog />}>
            <Route index path="projects" element={<BlogContext />} />
            <Route path="notes" element={<BlogContext />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashBoard />}>
            <Route path="users" element={<RightContext />} />
            <Route path="projects" element={<RightContext />}>
              <Route path="create" element={<RightContext />} />
              <Route path="update/:id" element={<RightContext />} />
            </Route>
            <Route path="notes" element={<RightContext />}>
              <Route path="create" element={<RightContext />} />
              <Route path="update/:id" element={<RightContext />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <RouterProvider router={router} />
    {/* </React.StrictMode> */}
  </Provider>
);
