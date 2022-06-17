import styles from "./tasks.module.css";
import Button from "../buttons";
import { memo, useState, useCallback } from "react";
import EditTask from "../Task/EditTask";
import { api } from "../../actions/api";
import { deleteTask, getTasks } from "../../actions/tasks";

const Tasks = ({ tasks, setTasks }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");

  const teste = useCallback(
    async (e) => {
      deleteTask(e);
      const data = await getTasks();
      setTasks(data);
    },
    [setTasks]
  );

  const editTask = useCallback(
    (e) => {
      const { id } = e.target;
      return api
        .patch(`api/tasks/${id}`, {
          title: title,
        })
        .then(() => {
          // getTasks();
        })
        .catch((err) => console.log(err));
    },
    [title]
  );

  const handleEditTitle = useCallback((value) => {
    return setTitle(value);
  }, []);

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
            <Button id={_id} onClick={teste}>
              Deletar
            </Button>
            <Button id={_id} onClick={editTask}>
              Editar
            </Button>
          </div>
        );
      })}

      {show ? (
        <EditTask
          title={title}
          onChange={handleEditTitle}
          handleTask={editTask}
        />
      ) : null}
    </>
  );
};

export default memo(Tasks);
