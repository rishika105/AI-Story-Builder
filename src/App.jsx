import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/update-password" element={<UpdatePassword />}></Route>
        <Route path="/verify-email" element={<VerifyEmail />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
};

export default App;
