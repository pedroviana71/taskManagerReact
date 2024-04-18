import { Outlet } from "react-router-dom";
import Header from "./components/header";
import useWindowDimensions from "./utils/customHooks/useWindowDimensions";
import styles from "./App.module.scss";

const mobile = {
  height: "100vh",
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
};

const App = () => {
  const { width } = useWindowDimensions();
  return (
    <main
      style={
        (width < 900
          ? mobile
          : {
              height: "100vh",
            }) as React.CSSProperties
      }
      className={styles.global}
    >
      <Header />
      <Outlet />
    </main>
  );
};

export default App;
