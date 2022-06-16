import styles from "./tasks.module.css";
import Button from "../buttons";
import { memo } from "react";

const Tasks = ({ tasks, deleteTask, editTask }) => {
  return (
    <>
      {tasks.map((task) => {
        const { _id } = task;
        return (
          <div key={_id} className={styles.container}>
            <div className={styles.title}>{task.title}</div>
            {task.comments ? (
              <div className={styles.comments}>{task.comments}</div>
            ) : null}
            <Button id={_id} onClick={deleteTask}>
              Deletar
            </Button>
            <Button id={_id} onClick={editTask}>
              Editar
            </Button>
          </div>
        );
      })}
    </>
  );
};

export default memo(Tasks);
