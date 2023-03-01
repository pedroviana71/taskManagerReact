import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { useGetUserQuery } from "../../app/api/tasksSlice";
import { MdClose } from "react-icons/md";
import useWindowDimensions from "../../utils/customHooks/useWindowDimensions";

export const SideBar = ({ setShowMenu }) => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const { data } = useGetUserQuery();

  const handleLogout = () => {
    navigate("/logout");
    setShowMenu(false);
  };

  return (
    <div className={width > 900 ? styles.container : styles.mobileContainer}>
      <p>{data?.username}</p>
      <p>{data?.email}</p>
      <button onClick={handleLogout}>Log Out</button>
      <button onClick={() => setShowMenu(false)}>
        <MdClose />
      </button>
    </div>
  );
};
