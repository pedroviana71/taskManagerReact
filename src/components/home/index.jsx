import Button from "../buttons";
import Text from "../text/index";
import styles from "./index.module.scss";
import { MdOutlineAddBox } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-task");
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Text className={styles.title}>Tarefas</Text>
        <Button className={styles.button} onClick={handleClick}>
          <MdOutlineAddBox className={styles.icon} />
          <Text className={styles.buttonText}>Adicionar</Text>
        </Button>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
