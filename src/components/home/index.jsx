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
import { MdOutlineAddBox } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setTask } from "../../features/tasks";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState("");
  const [category, setCategory] = useState("");
  const [showCreateTask, setShowCreateTask] = useState(false);
  const teste = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleGetTask = async () => {
    const data = await getTasks();
    setTasks(data);
    dispatch(setTask(data));
  };

  console.log(teste);

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

  const handleShowCreateTask = () => {
    setShowCreateTask(!showCreateTask);
  };

  useEffect(() => {
    handleGetTask();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Text className={styles.title}>Tarefas</Text>
        <Button className={styles.button} onClick={handleShowCreateTask}>
          <MdOutlineAddBox className={styles.icon} />
          <Text className={styles.buttonText}>Adicionar</Text>
        </Button>
      </div>
      {showCreateTask ? (
        <CreateTask
          title={title}
          setTitle={setTitle}
          comments={comments}
          setComments={setComments}
          category={category}
          setCategory={setCategory}
          handleSubmit={handleCreateTask}
        />
      ) : null}
      <Tasks
        tasks={tasks}
        deleteTask={handleDeleteTask}
        setTasks={setTasks}
        handleEditTask={handleEditTask}
      />
    </div>
  );
};

export default Home;
