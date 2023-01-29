import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

export const SideBar = ({ setShowMenu }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
    setShowMenu(false);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};
