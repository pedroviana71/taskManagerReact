import { Outlet } from "react-router-dom";
import Header from "./components/header";
import styles from "./utils/styles/normalize.scss";

const App = () => {
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
      }}
    >
      <Header className={styles} />
      <Outlet />
    </main>
  );
};

export default App;
