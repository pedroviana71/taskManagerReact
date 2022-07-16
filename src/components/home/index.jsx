import { useState, useEffect } from "react";
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
  const [comments, setComments] = useState("");
  const [category, setCategory] = useState("");
  // const [editTitle, setEditTitle] = useState("");
  // const [category, setCategory] = useState("toDo");

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

  const handleEditTask = async (id, title, comments, category, completed) => {
    await editTask(id, title, comments, category, completed);
    handleGetTask();
  };

  const handleCreateTask = async () => {
    await createTask(title, category, comments);
    // const newData = [...tasks, { title }]; //!fix this later cause cant delete task
    // setTasks(newData);
    handleGetTask();
  };

  useEffect(() => {
    handleGetTask();
  }, []);

  return (
    <div className={styles.container}>
      <Text className={styles.title}>Tarefas</Text>
      <div className={styles.innerContainer}>
        {/* <Button className={styles.buttons}>Todo</Button> */}
        <CreateTask
          title={title}
          setTitle={setTitle}
          comments={comments}
          setComments={setComments}
          category={category}
          setCategory={setCategory}
          handleSubmit={handleCreateTask}
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
