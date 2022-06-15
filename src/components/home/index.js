import { useState, useMemo, useCallback, useEffect } from "react";
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

  useEffect(() => {
    api.get("api/tasks").then(({ data }) => {
      setTasks(data);
    });
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    try {
      api.post("api/tasks", {
        title,
      });
      api.get("api/tasks").then(({ data }) => {
        setTasks(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = (e) => {
    e.preventDefault();
    console.log(e); //! fix this function

    // try {
    //   api.delete("api/tasks/");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleTitle = (value) => {
    setTitle(value);
  };

  return (
    <div className={styles.container}>
      <Text>Tarefas</Text>
      <div className={styles.innerContainer}>
        <div className={styles.buttons}>
          <Button>Todo</Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitle(e.target.value)}
        />
        <button onClick={handleAddTask}>aqui</button>
        <div>
          <Tasks tasks={tasks} onClick={deleteTask} />
        </div>
      </div>
    </div>
  );
};

export default Home;
