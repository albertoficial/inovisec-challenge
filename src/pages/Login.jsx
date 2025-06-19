import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CREDENTIALS from "../constants";
import ValidationMessage from "../components/ValidationMessage";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setEmailError("");

    if (!user) {
      setEmailError("El email es requerido");
      return;
    }

    if (!validateEmail(user)) {
      setEmailError("Por favor ingrese un email válido");
      return;
    }

    if (!pass) {
      setError("La contraseña es requerida");
      return;
    }

    if (user !== CREDENTIALS.email || pass !== CREDENTIALS.password) {
      setError("Usuario o contraseña incorrectos");
      return;
    }

    localStorage.setItem("isAuthenticated", "true");
    navigate("/map");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="user">
            Usuario
          </label>
          <input
            className="login-input"
            id="user"
            type="text"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
              setEmailError("");
            }}
            autoComplete="username"
            placeholder="nombre@correo.com"
          />
          <ValidationMessage message={emailError} />

          <label className="login-label" htmlFor="pass">
            Contraseña
          </label>
          <input
            className="login-input"
            id="pass"
            type="password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              setError("");
            }}
            autoComplete="current-password"
            placeholder="·····"
          />
          <ValidationMessage message={error} />

          <button className="login-button" type="submit">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
