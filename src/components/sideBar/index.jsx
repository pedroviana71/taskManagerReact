import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { useGetUserQuery } from "../../app/api/tasksSlice";
import { MdKeyboardArrowLeft, MdLogout } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";

export const SideBar = ({ setShowMenu }) => {
  const navigate = useNavigate();
  const { data } = useGetUserQuery();

  const handleLogout = () => {
    navigate("/logout");
    setShowMenu(false);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => setShowMenu(false)} className={styles.arrowBack}>
        <MdKeyboardArrowLeft />
      </button>
      <div className={styles.profileContainer}>
        <div>
          <BsPersonCircle className={styles.profilePic} />
          <p className={styles.profileName}>{data?.username}</p>
        </div>
        <button onClick={handleLogout} className={styles.logout}>
          <p>Log Out</p>
          <MdLogout />
        </button>
      </div>
    </div>
  );
};
