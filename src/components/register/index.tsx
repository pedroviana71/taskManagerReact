import React, { useState } from "react";
import { useRegisterMutation } from "../../app/api/authSlice";
import { useNavigate, Link } from "react-router-dom";
import styles from "./index.module.scss";
import InlineAlert from "../custom/inlineAlert";

const Register = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log(password, passwordConfirmation);

    if (password !== passwordConfirmation) {
      setError(true);
      return;
    }

    if (!error && !errorEmail) {
      await register({
        email,
        password,
        username,
      });

      navigate("/login");
    }
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(false);
  };

  const handlePasswordConfirmation = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirmation(e.target.value);
    setError(false);
  };
  return (
    <section className={styles.registerSection}>
      <h1 className={styles.title}>Registre-se!</h1>
      <h4>
        Insira seus dados para criar uma conta e começar a usar o nosso serviço.
      </h4>
      <form className={styles.form}>
        <div className={styles.container}>
          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => handleEmail(e)}
            className={styles.input}
          />
        </div>
        {errorEmail && <InlineAlert text="Email invalido" />}
        <div className={styles.container}>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => handlePassword(e)}
            className={styles.input}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="passwordConfirmation">Confirme a senha:</label>
          <input
            type="password"
            id="passwordConfirmation"
            onChange={(e) => handlePasswordConfirmation(e)}
            className={styles.input}
          />
        </div>
        {error && <InlineAlert text="As senhas nao coincidem" />}
        <div className={styles.container}>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className={styles.input}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.registerButton}
          >
            Registrar
          </button>
        </div>
      </form>
      <div className={styles.linkContainer}>
        <h5>Já tem uma conta?</h5>
        <Link to="/login" className={styles.link}>
          Login.
        </Link>
      </div>
    </section>
  );
};

export default Register;
