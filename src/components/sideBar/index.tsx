import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { useGetUserQuery } from "../../app/api/tasksSlice";
import { MdKeyboardArrowLeft, MdLogout } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../../features/sideBarSlice";

export const SideBar = () => {
  const navigate = useNavigate();
  const { data } = useGetUserQuery();
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate("/logout");
    dispatch(toggleSideBar(false));
  };

  const handleBackClick = () => {
    dispatch(toggleSideBar(false));
  };

  return (
    <div className={styles.container}>
      <button className={styles.arrowBack} onClick={handleBackClick}>
        <MdKeyboardArrowLeft />
      </button>
      <div className={styles.profileContainer}>
        <div>
          <BsPersonCircle className={styles.profilePic} />
          <p className={styles.profileName}>{data?.username}</p>
        </div>
        <button onClick={handleLogout} className={styles.logout}>
          <p className={styles.logoutText}>Log Out</p>
          <MdLogout className={styles.logoutIcon} />
        </button>
      </div>
    </div>
  );
};
