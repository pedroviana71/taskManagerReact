import { MdOutlineAddBox, MdMenu, MdFormatColorFill } from "react-icons/md";
import styles from "./index.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Icons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const handleSideBar = () => {
    setShowMenu(!showMenu);
  };

  const handleCategories = () => {
    navigate("/categories");
  };

  const handleCreateTask = () => {
    navigate("/create-task");
  };

  return (
    <section className={styles.header}>
      <MdMenu className={styles.sideBarIcon} onClick={handleSideBar} />
      <div className={styles.icons}>
        {location.pathname !== "/create-task" ? (
          <button className={styles.buttonAdd} onClick={handleCreateTask}>
            <MdOutlineAddBox className={styles.icon} />
          </button>
        ) : null}
        <button className={styles.buttonCategory} onClick={handleCategories}>
          <MdFormatColorFill />
        </button>
      </div>
    </section>
  );
};

export default Icons;
