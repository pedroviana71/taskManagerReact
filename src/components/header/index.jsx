import styles from "./index.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SideBar } from "../sideBar";
import OutsideClickHandler from "react-outside-click-handler/build/OutsideClickHandler";
import { useEffect } from "react";
import sideBar from "../../assets/SideBar.svg";
import { MdArrowBack } from "react-icons/md";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);

  const handleSideBar = () => {
    setShowMenu(!showMenu);
  };
  const handleGoHome = () => {
    navigate("/");
  };

  useEffect(() => {
    setIsLogged(!!localStorage.getItem("id"));
    setShowBackButton(true);
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      <button className={styles.menuSideBar} onClick={handleSideBar}>
        <img src={sideBar} alt="Menu" />
      </button>
      <h1 className={styles.appTitle}>LISTING</h1>
      {showMenu && isLogged ? (
        <OutsideClickHandler onOutsideClick={handleSideBar}>
          <SideBar setShowMenu={setShowMenu} />
        </OutsideClickHandler>
      ) : null}
      {showBackButton && location.pathname !== "/" ? (
        <MdArrowBack onClick={handleGoHome} className={styles.arrowBack} />
      ) : null}
    </div>
  );
};

export default Home;
