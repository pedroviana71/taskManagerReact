import styles from "./tasks.module.scss";
import Button from "../buttons";
import { memo, useState } from "react";
import dayjs from "dayjs";

import {
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetAllTasksQuery,
  useGetUserQuery,
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
  useGetUserQuery();

  const [tasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const { data } = useGetAllTasksQuery();

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const filteredTasks = (word) => {
    const filtered = tasks.filter((task) => {
      if (word === "") {
        return task;
      } else {
        return task.title.toLowerCase().includes(word.toLowerCase());
      }
    });
    setFiltered(filtered);
  };

  useEffect(() => {
    if (!user && !token) {
      navigate("/login");
    }
    setTasks(data);
    setFiltered(data);
  }, [data, user, token, navigate, dispatch]);

  return (
    <div className={styles.outerContainer}>
      <div>
        <input
          className={styles.search}
          type="text"
          placeholder="Search"
          onChange={(e) => filteredTasks(e.target.value)}
        />
      </div>
      {filtered?.map((task) => {
        const { _id, category, deadline, title } = task;

        const handleComplete = (id) => {
          editTask({ id, completed: !task.completed });
        };

        return (
          <section key={_id} className={styles.container}>
            <div className={styles.taskContainer}>
              <div className={styles.buttonsContainer}>
                {deadline ? (
                  <h4 className={styles.time}>
                    {dayjs(deadline).format("DD/MM")}
                  </h4>
                ) : (
                  <h3>-</h3>
                )}
                <div className={styles.eventsContainer}>
                  <button
                    onClick={() => {
                      deleteTask(_id);
                    }}
                    className={styles.deleteButton}
                  >
                    <MdOutlineDeleteForever />
                  </button>
                  <button
                    onClick={() => handleComplete(task._id)}
                    className={styles.toggleButton}
                  >
                    {task.completed ? <MdToggleOn /> : <MdOutlineToggleOff />}
                  </button>
                </div>
              </div>
              <button
                className={styles.titleContainer}
                onClick={() => navigate(`/edit/${_id}`)}
              >
                <h1
                  className={clsx(
                    task.completed ? styles.titleCompleted : null
                  )}
                >
                  {title}
                </h1>
                <p
                  className={clsx(
                    task.completed ? styles.titleCompleted : null
                  )}
                >
                  {category}
                </p>
              </button>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default memo(Tasks);
