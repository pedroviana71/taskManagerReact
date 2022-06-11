import { useState } from "react";
import Button from "../buttons";
import Text from "../text/index";
import styles from "./index.module.css";

const Home = () => {
  const [show, setShow] = useState(true);
  const [category, setCategory] = useState("toDo");

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
        <div></div>
      </div>
    </div>
  );
};

export default Home;
