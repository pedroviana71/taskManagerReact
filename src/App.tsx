import { Outlet } from "react-router-dom";
import Header from "./components/header";
import useWindowDimensions from "./utils/customHooks/useWindowDimensions";
import styles from "./App.module.scss";

const desktop = {
  height: "100vh",
  display: "flex",
  backgroundColor: "rgba(249, 242, 237, 0.5)",
};

const mobile = {
  height: "100vh",
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  backgroundColor: "rgba(249, 242, 237, 0.5)",
};

const App = () => {
  const { width } = useWindowDimensions();
  return (
    <main style={width > 900 ? desktop : mobile} className={styles.global}>
      <Header />
      <Outlet />
    </main>
  );
};

export default App;
