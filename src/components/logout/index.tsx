import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <section className={styles.container}>
      <h1>Voce realmente deseja sair?</h1>
      <button onClick={handleLogout} className={styles.button}>
        Sair
      </button>
      <button onClick={handleBack} className={styles.button}>
        Voltar
      </button>
    </section>
  );
};

export default Logout;
