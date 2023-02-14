import styles from "./tasks.module.scss";
import Button from "../buttons";
import { memo, useState } from "react";
import dayjs from "dayjs";

import {
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetAllTasksQuery,
} from "../../app/api/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectCurrentUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdToggleOn } from "react-icons/md";
import { MdOutlineToggleOff } from "react-icons/md";
import clsx from "clsx";

const Tasks = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [deleteTask] = useDeleteTaskMutation();
  const [editTask] = useEditTaskMutation();

  const [tasks, setTasks] = useState([]);

  const { data } = useGetAllTasksQuery();

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user && !token) {
      navigate("/login");
    }
    setTasks(data);
  }, [data, user, token, navigate, dispatch]);

  return (
    <>
      {tasks?.map((task) => {
        const { _id, category, deadline } = task;

        const handleComplete = (id) => {
          editTask({ id, completed: !task.completed });
        };

        return (
          <section key={_id} className={styles.container}>
            <button
              className={styles.taskContainer}
              onClick={() => navigate(`/edit/${_id}`)}
            >
              <div className={styles.timeContainer}>
                {deadline ? (
                  <h4 className={styles.time}>
                    {dayjs(deadline).format("DD/MM")}
                  </h4>
                ) : (
                  <h3>-</h3>
                )}
              </div>
              <div className={styles.titleContainer}>
                <h1
                  className={clsx(
                    task.completed ? styles.titleCompleted : null
                  )}
                >
                  {task.title}
                </h1>
                <p
                  className={clsx(
                    task.completed ? styles.titleCompleted : null
                  )}
                >
                  {category}
                </p>
              </div>
            </button>

            <button
              onClick={() => handleComplete(task._id)}
              className={styles.toggleButton}
            >
              {task.completed ? <MdToggleOn /> : <MdOutlineToggleOff />}
            </button>

            <Button
              onClick={() => {
                deleteTask(_id);
              }}
              className={styles.deleteButton}
            >
              <MdOutlineDeleteForever />
            </Button>
          </section>
        );
      })}
    </>
  );
};

export default memo(Tasks);
