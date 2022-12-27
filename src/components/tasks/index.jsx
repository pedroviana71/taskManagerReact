import styles from "./tasks.module.scss";
import Button from "../buttons";
import { memo, useState } from "react";

import {
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetAllTasksQuery,
} from "../../app/api/tasksSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectCurrentUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [deleteTask] = useDeleteTaskMutation();
  const [editTask] = useEditTaskMutation();

  const [tasks, setTasks] = useState([]);

  const { data } = useGetAllTasksQuery();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setTasks(data);
  }, [data, user, navigate]);

  return (
    <>
      {tasks?.map((task) => {
        const { _id, category, comments } = task;

        const handleComplete = (id) => {
          editTask({ id, completed: !task.completed });
        };

        return (
          <section key={_id} className={styles.container}>
            <section className={styles.taskContainer}>
              <div className={styles.timeContainer}>
                <h4 className={styles.time}>16:45</h4>
                <h6 className={styles.date}>25/12</h6>
              </div>
              <div className={styles.titleContainer}>
                <h1 className={styles.title}>{task.title}</h1>
                <p className={styles.category}>{category}</p>
              </div>
            </section>
            <p className={styles.comments}>{comments}</p>
            {task.completed ? (
              <div className={styles.comments}>Completo!</div>
            ) : null}
            <input
              type="checkBox"
              defaultChecked={task.completed}
              value={task.completed}
              onChange={() => handleComplete(task._id)}
            />
            <Button
              onClick={() => {
                deleteTask(_id);
              }}
            >
              Deletar
            </Button>
            <Button id={_id} onClick={() => navigate(`/edit/${_id}`)}>
              Editar
            </Button>
          </section>
        );
      })}
    </>
  );
};

export default memo(Tasks);
