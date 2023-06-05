import { useState } from "react";
import { useResetPasswordMutation } from "../../app/api/tasksSlice";
import styles from "./index.module.scss";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [sendEmail] = useResetPasswordMutation();

  const handleSendEmail = () => {
    sendEmail(email);
  };

  return (
    <div className={styles.container}>
      <h4>Digite seu email para recuperar senha</h4>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendEmail} className={styles.button}>
        Enviar
      </button>
    </div>
  );
};

export default ResetPassword;
