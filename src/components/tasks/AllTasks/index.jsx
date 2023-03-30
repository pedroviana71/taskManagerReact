import dayjs from "dayjs";
import {
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetCategoriesQuery,
} from "../../../app/api/tasksSlice";
import styles from "./index.module.scss";
import {
  MdOutlineDeleteForever,
  MdOutlineToggleOff,
  MdToggleOn,
  MdBookmark,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useEffect, useState } from "react";

const AllTasks = ({ filtered, title }) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [editTask] = useEditTaskMutation();
  const [categories, setCategories] = useState([]);
  const { data } = useGetCategoriesQuery();
  const navigate = useNavigate();

  useEffect(() => {
    setCategories(data);
  }, [data]);

  return (
    <div className={styles.container}>
      {title ? <h1>{title}</h1> : null}
      {filtered?.map((task) => {
        const { _id, deadline, title } = task;

        const handleComplete = (id) => {
          editTask({ id, completed: !task.completed });
        };

        const category = categories?.find(
          (category) => category._id === task.categoryId
        );

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
                <MdBookmark
                  style={{
                    color: category?.color,
                  }}
                  className={styles.colorTag}
                />
                <h1
                  className={clsx(
                    task.completed ? styles.titleCompleted : null
                  )}
                >
                  {title}
                </h1>
              </button>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default AllTasks;
