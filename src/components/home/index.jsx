import { useState, useCallback, useEffect } from "react";
import CreateTask from "../Task/CreateTask";
import Tasks from "../tasks/index";
import Button from "../buttons";
import Text from "../text/index";
import styles from "./index.module.scss";
import {
  getTasks,
  deleteTask,
  createTask,
  editTask,
} from "../../actions/tasks";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  // const [editTitle, setEditTitle] = useState("");
  // const [category, setCategory] = useState("toDo");
  console.log(tasks);

  const handleGetTask = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    const newData = [];
    tasks.forEach((task) => {
      if (task._id !== id) {
        newData.push(task);
      }
    });
    setTasks(newData);
  };

  const handleEditTask = async (e, title) => {
    await editTask(e, title);
    handleGetTask();
  };

  const handleCreateTask = async () => {
    await createTask(title);
    // const newData = [...tasks, { title }]; //!fix this later cause cant delete task
    // setTasks(newData);
    handleGetTask();
  };

  useEffect(() => {
    handleGetTask();
  }, []);

  return (
    <div className={styles.container}>
      <Text>Tarefas</Text>
      <div className={styles.innerContainer}>
        <Button className={styles.buttons}>Todo</Button>
        <CreateTask
          title={title}
          handleSubmit={handleCreateTask}
          onChange={setTitle}
        />
        <Tasks
          tasks={tasks}
          deleteTask={handleDeleteTask}
          setTasks={setTasks}
          handleEditTask={handleEditTask}
        />
      </div>
    </div>
  );
};

export default Home;
