import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../app/api/authSlice";
import { setCredentials } from "../../features/userSlice";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import InlineAlert from "../custom/inlineAlert";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await login({
        email,
        password,
      }).unwrap();
      setEmail("");
      setPassword("");
      navigate("/");
      dispatch(setCredentials(data.username));
      localStorage.setItem("token", data.token); //! mudar para refreshed token assim que possivel
      localStorage.setItem("id", data.id);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(false);
  };
  const handleCreateAccount = () => {
    navigate("/register");
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(false);
  };

  return (
    <section className={styles.loginSection}>
      <h1 className={styles.title}>Login</h1>
      <h4>Digite seus dados abaixo:</h4>
      <form className={styles.form}>
        <div className={styles.container}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => handleEmail(e)}
            className={styles.input}
          />
        </div>
        <div className={styles.container}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => handlePassword(e)}
            className={styles.input}
          />
        </div>
        {error && <InlineAlert text="Email ou senha incorretos" />}
        <button
          type="submit"
          onClick={handleSubmit}
          className={styles.loginButton}
        >
          Login
        </button>
        <button
          onClick={handleResetPassword}
          className={styles.forgotPasswordButton}
        >
          Esqueceu sua senha?{" "}
        </button>
      </form>
      <div className={styles.createAccount}>
        <p>Ainda não tem uma conta?</p>
        <button
          className={styles.createAccountButton}
          onClick={handleCreateAccount}
        >
          Criar uma conta
        </button>
      </div>
    </section>
  );
};

export default Login;
