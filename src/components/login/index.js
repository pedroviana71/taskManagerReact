import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../app/api/authSlice";
import { setCredentials } from "../../features/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({
        email,
        password,
      }).unwrap();
      setEmail("");
      setPassword("");
      navigate("/");
      dispatch(setCredentials(data, data.username));
      localStorage.setItem("token", data.token); //! mudar para refreshed token assim que possivel 
      localStorage.setItem("id", data.id);
      // console.log(data, 'data');
    } catch (error) {
      console.log(error);
    }
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.loginButton}
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
