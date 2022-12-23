import { useState } from "react";
import { useRegisterMutation } from "../../app/api/authSlice";
import { useNavigate, Link } from "react-router-dom";
import styles from "./index.module.scss";

const Register = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register({
        email,
        password,
        username,
      });
      navigate("/login");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={styles.input}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className={styles.input}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="username">Username:</label>
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
