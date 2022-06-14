import { useState, useMemo, useCallback, useEffect } from "react";
import Tasks from "../tasks/index";
import Button from "../buttons";
import Text from "../text/index";
import styles from "./index.module.css";
import { api } from "../../actions/index";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(true);
  const [category, setCategory] = useState("toDo");

  useEffect(() => {
    api.get("api/tasks").then(({ data }) => {
      setTasks(data);
    });
  }, []);

  console.log(tasks);

  return (
    <div className={styles.container}>
      <Text>Tarefas</Text>
      <div className={styles.innerContainer}>
        <div className={styles.buttons}>
          <Button name="To Do" />
          <Button name="Doing" />
          <Button name="Done" />
          <Button name="All" />
        </div>
        <div>
          <Tasks tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default Home;
