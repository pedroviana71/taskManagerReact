import { useSelector } from "react-redux";
import Button from "../buttons";
import Text from "../text/index";
import styles from "./index.module.scss";
import { MdOutlineAddBox, MdMenu } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SideBar } from "../sideBar";
import OutsideClickHandler from "react-outside-click-handler/build/OutsideClickHandler";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const titles = {
    "/": "suas tarefas",
    "/create-task": "criar tarefa",
  };

  const handleClick = () => {
    navigate("/create-task");
  };

  const handleSideBar = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        {user && location.pathname !== "/create-task" ? (
          <Button className={styles.button} onClick={handleClick}>
            <MdOutlineAddBox className={styles.icon} />
            <Text className={styles.buttonText}>Add.</Text>
          </Button>
        ) : null}
        <h1 className={styles.title}>
          {titles[location.pathname] || "editar tarefa"}
        </h1>
        <MdMenu className={styles.sideBarIcon} onClick={handleSideBar} />
      </section>
      {showMenu ? (
        <OutsideClickHandler onOutsideClick={handleSideBar}>
          <SideBar setShowMenu={setShowMenu} />
        </OutsideClickHandler>
      ) : null}
    </div>
  );
};

export default Home;
