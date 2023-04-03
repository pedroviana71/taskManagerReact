import { useSelector } from "react-redux";
import Button from "../buttons";
import styles from "./index.module.scss";
import { MdOutlineAddBox, MdMenu, MdFormatColorFill } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SideBar } from "../sideBar";
import OutsideClickHandler from "react-outside-click-handler/build/OutsideClickHandler";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const handleCreateTask = () => {
    navigate("/create-task");
  };

  const handleCategories = () => {
    navigate("/categories");
  };

  const handleSideBar = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    setIsLogged(!!localStorage.getItem("id"));
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      {user && location.pathname !== "/create-task" && isLogged ? (
        <section className={styles.header}>
          <MdMenu className={styles.sideBarIcon} onClick={handleSideBar} />
          <div className={styles.icons}>
            <Button className={styles.buttonAdd} onClick={handleCreateTask}>
              <MdOutlineAddBox className={styles.icon} />
            </Button>
            <Button
              className={styles.buttonCategory}
              onClick={handleCategories}
            >
              <MdFormatColorFill />
            </Button>
          </div>
        </section>
      ) : null}
      {showMenu && isLogged ? (
        <OutsideClickHandler onOutsideClick={handleSideBar}>
          <SideBar setShowMenu={setShowMenu} />
        </OutsideClickHandler>
      ) : null}
    </div>
  );
};

export default Home;
