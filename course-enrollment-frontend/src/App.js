import * as React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import AllCourses from "./views/allCourses";
import EnrolledCourses from "./views/enrolledCourses";
import "./App.css";
import MenuBar from "./components/menubar";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <MenuBar />
        <Routes>
          <Route path="/" element={<AllCourses />} />
          <Route path="enroll" element={<EnrolledCourses />} />
          {/* <Route path="login" element={<Login />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// function Login() {
//   return <h2>Login</h2>;
// }