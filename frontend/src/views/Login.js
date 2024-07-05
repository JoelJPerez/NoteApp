import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeUser = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await authService.login(username, password).then(
        () => {
          setToken(authService.getCurrentUser());
          navigate("/");
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        gap: 16,
        textAlign: "center",
        display: "flex",
        flexDirection: " column",
        alignItems: "flex-start",
        padding: 24,
        width: 400,
        height: 300,
        backgroundColor: "white",
      }}
    >
      <h1 style={{ color: "black", alignSelf: "center" }}>Login</h1>
      <label>User:</label>
      <input
        name="username"
        value={username}
        placeholder="test"
        onChange={(e) => handleChangeUser(e)}
      />
      <label>Password:</label>
      <input
        name="password"
        value={password}
        placeholder="1234"
        onChange={(e) => handleChangePassword(e)}
      />
      <button
        style={{
          padding: 8,
          backgroundColor: "black",
          color: "wheat",
        }}
        onClick={(e) => handleLogin(e)}
      >
        Send
      </button>
    </div>
  );
}