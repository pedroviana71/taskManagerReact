import { useState } from "react";
import Tasks from "../tasks/index";
import Button from "../buttons";
import Text from "../text/index";
import styles from "./index.module.scss";
import { MdOutlineAddBox } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [tasks, setTasks] = useState([]);
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
      <Tasks tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Home;
