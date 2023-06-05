import styles from "./index.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { SideBar } from "../sideBar";
import { useEffect } from "react";
import sideBar from "../../assets/SideBar.svg";
import { MdArrowBack } from "react-icons/md";
import ClickOutside from "../../utils/customHooks/useClickOutside";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useDispatch } from "react-redux";
import {
  toggleSideBar,
  typeClickOutsideAction,
} from "../../features/sideBarSlice";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const { showSideBar } = useSelector((state: RootState) => state.sideBar);
  const dispatch = useDispatch();

  const handleSideBar = () => {
    dispatch(toggleSideBar(!showSideBar));
  };

  const handleClickOutside = () => {
    dispatch(typeClickOutsideAction("CLICK_OUTSIDE"));
    dispatch(toggleSideBar(false));
  };

  const handleGoHome = useCallback(() => {
    if (location.state && location.state.previousPath === "/create-task") {
      navigate("/create-task");
    } else if (
      location.state &&
      location.state.previousPath === "/create-category"
    ) {
      navigate("/categories");
    } else if (
      location.state &&
      location.state.previousPath &&
      location.state.previousPath.includes("edit")
    ) {
      navigate(location.state.previousPath);
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
      {isLogged ? (
        <button className={styles.menuSideBar} onClick={handleSideBar}>
          <img src={sideBar} alt="Menu" />
        </button>
      ) : null}
      <h1 className={styles.appTitle}>LISTING</h1>
      {showSideBar && isLogged ? (
        <ClickOutside onClick={handleClickOutside}>
          <SideBar />
        </ClickOutside>
      ) : null}
      {showBackButton &&
      location.pathname !== "/" &&
      location.pathname !== "/login" ? (
        <MdArrowBack onClick={handleGoHome} className={styles.arrowBack} />
      ) : null}
    </div>
  );
};

export default Home;
