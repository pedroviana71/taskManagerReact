import { useState, useMemo, useCallback, useEffect } from "react";
import Task from "../Task/Task";
import Tasks from "../tasks/index";
import Button from "../buttons";
import Text from "../text/index";
import styles from "./index.module.css";
import { api } from "../../actions/index";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(true);
  const [category, setCategory] = useState("toDo");

  const handleTitle = useCallback((value) => {
    return setTitle(value);
  }, []);

  const getTasks = useCallback(() => {
    return api
      .get("api/tasks")
      .then(({ data }) => {
        setTasks(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const createTask = useCallback(() => {
    return api
      .post("api/tasks", {
        title,
      })
      .then(({ data }) => {
        console.log(data);
        getTasks();
      })
      .catch((err) => console.log(err));
  }, [title, getTasks]);

  const deleteTask = useCallback(
    (e) => {
      const { id } = e.target;
      return api
        .delete(`api/tasks/${id}`)
        .then(({ data }) => {
          console.log(data);
          getTasks();
        })
        .catch((err) => console.log(err));
    },
    [getTasks]
  );

  useEffect(() => {
    getTasks();
  }, [createTask, deleteTask, getTasks]);

  return (
    <div className={styles.container}>
      <Text>Tarefas</Text>
      <div className={styles.innerContainer}>
        <Button className={styles.buttons}>Todo</Button>
        <Task title={title} createTask={createTask} handleTitle={handleTitle} />
        <Tasks
          tasks={tasks}
          deleteTask={deleteTask}
          editTask={() => console.log()}
        />
      </div>
      <div></div>
    </div>
  );
};

export default Home;
