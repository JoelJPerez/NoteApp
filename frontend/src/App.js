import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Archived from "./views/Archived";
import Login from "./views/Login";
import authService from "./services/auth.service";

function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    console.log("Set Token useEffect");
    setToken(authService.getCurrentUser());
  }, []);

  if (!token) {
    return <Login setToken={setToken} />;
  } else {
    console.log(token);
  }

  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="archived" element={<Archived />} />
      </Routes>
    </div>
  );
}

export default App;
