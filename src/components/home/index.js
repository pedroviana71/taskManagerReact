import { useState, useCallback, useEffect } from "react";
import CreateTask from "../Task/CreateTask";
import EditTask from "../Task/EditTask";
import Tasks from "../tasks/index";
import Button from "../buttons";
import Text from "../text/index";
import styles from "./index.module.css";
import { api } from "../../actions/api";
import { getTasks } from "../../actions/tasks";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [category, setCategory] = useState("toDo");

  const handleTitle = useCallback((value) => {
    return setTitle(value);
  }, []);

  const getTask = useCallback(async () => {
    const data = await getTasks();
    setTasks(data);
  }, [setTasks]);

  const createTask = useCallback(() => {
    return api
      .post("api/tasks", {
        title,
      })
      .then(({ data }) => {
        console.log(data);
        getTask();
      })
      .catch((err) => console.log(err));
  }, [title, getTask]);

  useEffect(() => {
    getTask();
  }, [createTask, getTask, setTasks]);

  return (
    <div className={styles.container}>
      <Text>Tarefas</Text>
      <div className={styles.innerContainer}>
        <Button className={styles.buttons}>Todo</Button>
        <CreateTask title={title} onClick={createTask} onChange={handleTitle} />
        <Tasks tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default Home;
