import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { useGetUserQuery } from "../../app/api/tasksSlice";


export const SideBar = ({ setShowMenu }) => {
  const navigate = useNavigate();
  const { data } = useGetUserQuery();

  const handleLogout = () => {
    navigate("/logout");
    setShowMenu(false);
  };

  return (
    <div className={styles.container}>
      <p>{data?.username}</p>
      <p>{data?.email}</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};
