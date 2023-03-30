import { Outlet } from "react-router-dom";
import Header from "./components/header";
import styles from "./utils/styles/normalize.scss";
import useWindowDimensions from "./utils/customHooks/useWindowDimensions";

const desktop = {
  height: "100vh",
  display: "flex",
}

const mobile = {
  height: "100vh",
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
}


const App = () => {
  const { width } = useWindowDimensions()
  return (
    <main
      style={width > 900 ? desktop : mobile}
    >
      <Header className={styles} />
      <Outlet />
    </main>
  );
};

export default App;
