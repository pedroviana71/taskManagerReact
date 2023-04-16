import { useSelector } from "react-redux";
import styles from "./index.module.scss";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { SideBar } from "../sideBar";
import OutsideClickHandler from "react-outside-click-handler/build/OutsideClickHandler";
import { useEffect } from "react";
import sideBar from "../../assets/SideBar.svg";

const Home = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const handleSideBar = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    setIsLogged(!!localStorage.getItem("id"));
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      <button className={styles.menuSideBar}>
        <img src={sideBar} alt="Menu" />
      </button>
      <h1 className={styles.appTitle}>LISTING</h1>
      {showMenu && isLogged ? (
        <OutsideClickHandler onOutsideClick={handleSideBar}>
          <SideBar setShowMenu={setShowMenu} />
        </OutsideClickHandler>
      ) : null}
    </div>
  );
};

export default Home;
