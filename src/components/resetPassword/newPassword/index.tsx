import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNewPasswordMutation } from "../../../app/api/tasksSlice";
import styles from "./index.module.scss";

const NewPassword = () => {
  const { token, userId } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword] = useNewPasswordMutation();
  const [reseted, setReseted] = useState(false);

  const handleSubmit = () => {
    if (password === confirmPassword && token && userId) {
      newPassword({ password, token, userId });
      setReseted(true);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Mudar a senha</h1>
      <h4>Coloque sua senha nova:</h4>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <h4>Confirme a senha:</h4>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {reseted && <h4>Senha alterada com sucesso!</h4>}
      <button onClick={handleSubmit}>Salvar</button>
    </div>
  );
};

export default NewPassword;
