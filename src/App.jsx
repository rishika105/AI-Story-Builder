import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import AIStoryChatBot from "./pages/AIStoryChatBot";
import Genres from "./pages/Genres";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/update-password/:id" element={<UpdatePassword />} />

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route
          path="/story-chatbot"
          element={
            <PrivateRoute>
              <AIStoryChatBot />
            </PrivateRoute>
          }
        />

        <Route
          path="/genres"
          element={
            <PrivateRoute>
              <Genres />
            </PrivateRoute>
          }
        ></Route>
        
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
};

export default App;
