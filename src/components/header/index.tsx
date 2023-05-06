import styles from "./index.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { SideBar } from "../sideBar";
import { useEffect } from "react";
import sideBar from "../../assets/SideBar.svg";
import { MdArrowBack } from "react-icons/md";
import ClickOutside from "../../utils/customHooks/useClickOutside";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);

  const handleSideBar = () => {
    setShowMenu(!showMenu);
  };

  const handleGoHome = useCallback(() => {
    if (location.state && location.state.previousPath === "/create-task") {
      navigate("/create-task");
    } else {
      navigate("/");
    }
  }, [location.state, navigate]);

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
        <ClickOutside onClick={handleSideBar}>
          <SideBar setShowMenu={setShowMenu} />
        </ClickOutside>
      ) : null}
      {showBackButton && location.pathname !== "/" ? (
        <MdArrowBack onClick={handleGoHome} className={styles.arrowBack} />
      ) : null}
    </div>
  );
};

export default Home;
