import { useSelector } from "react-redux";
import styles from "./index.module.scss";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { SideBar } from "../sideBar";
import OutsideClickHandler from "react-outside-click-handler/build/OutsideClickHandler";
import { useEffect } from "react";
import Icons from "./Icons";

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
      {user && isLogged ? <Icons /> : null}
      {showMenu && isLogged ? (
        <OutsideClickHandler onOutsideClick={handleSideBar}>
          <SideBar setShowMenu={setShowMenu} />
        </OutsideClickHandler>
      ) : null}
    </div>
  );
};

export default Home;
