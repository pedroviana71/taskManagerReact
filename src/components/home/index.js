import { useState, useMemo, useCallback, useEffect } from "react";
import NewTask from "../newTask/NewTask";
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

  const handleTitle = (value) => {
    setTitle(value);
  };

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
        <div className={styles.buttons}>
          <Button>Todo</Button>
        </div>
        <NewTask
          title={title}
          createTask={createTask}
          handleTitle={handleTitle}
        />
        <Tasks tasks={tasks} deleteTask={deleteTask} />
      </div>
    </div>
  );
};

export default Home;
