import { useSelector } from "react-redux";
import Button from "../buttons";
import Text from "../text/index";
import styles from "./index.module.scss";
import { MdOutlineAddBox, MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SideBar } from "../sideBar";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    navigate("/create-task");
  };

  const handleSideBar = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        {user ? (
          <Button className={styles.button} onClick={handleClick}>
            <MdOutlineAddBox className={styles.icon} />
            <Text className={styles.buttonText}>Add.</Text>
          </Button>
        ) : null}
        <h1 className={styles.title}>suas tarefas</h1>
        {showMenu ? <SideBar setShowMenu={setShowMenu} /> : null}
        <MdMenu className={styles.sideBarIcon} onClick={handleSideBar} />
      </section>
    </div>
  );
};

export default Home;
