import { useState, useCallback, useEffect } from "react";
import CreateTask from "../Task/CreateTask";
import Tasks from "../tasks/index";
import Button from "../buttons";
import Text from "../text/index";
import styles from "./index.module.css";
import { getTasks, deleteTask, createTask } from "../../actions/tasks";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [category, setCategory] = useState("toDo");

  const handleTitle = useCallback((value) => {
    return setTitle(value);
  }, []);

  const handleGetTask = useCallback(async () => {
    const data = await getTasks();
    setTasks(data);
  }, [setTasks]);

  const handleDeleteTask = useCallback(
    async (e) => {
      await deleteTask(e);
      handleGetTask();
    },
    [handleGetTask]
  );

  const handleCreateTask = useCallback(async () => {
    await createTask(title);
    handleGetTask();
  }, [handleGetTask, title]);

  useEffect(() => {
    handleGetTask();
  }, [handleGetTask, setTasks]);

  return (
    <div className={styles.container}>
      <Text>Tarefas</Text>
      <div className={styles.innerContainer}>
        <Button className={styles.buttons}>Todo</Button>
        <CreateTask
          title={title}
          onClick={handleCreateTask}
          onChange={handleTitle}
        />
        <Tasks tasks={tasks} deleteTask={handleDeleteTask} />
      </div>
    </div>
  );
};

export default Home;
