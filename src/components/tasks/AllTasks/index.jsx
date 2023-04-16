import dayjs from "dayjs";
import {
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetCategoriesQuery,
} from "../../../app/api/tasksSlice";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  MdCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdOutlineModeComment,
} from "react-icons/md";

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
          <div>
            <section key={_id} className={styles.taskContainer}>
              <button className={styles.checkBox}>
                {task.completed ? (
                  <MdOutlineCheckBox className={styles.checkBoxIcon} />
                ) : (
                  <MdCheckBoxOutlineBlank className={styles.checkBoxIcon} />
                )}
              </button>
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
                <div className={styles.taskFooter}>
                  {deadline ? (
                    <h4
                      className={styles.date}
                      style={{ backgroundColor: category.color }}
                    >
                      {dayjs(deadline).locale("pt-br").format("ddd, DD MMM")}
                    </h4>
                  ) : null}
                  {category ? (
                    <h5 className={styles.category}>{category.name}</h5>
                  ) : null}
                  {task.comments ? <MdOutlineModeComment /> : null}
                </div>
              </button>
            </section>
            <hr className={styles.line} />
          </div>
        );
      })}
    </div>
  );
};

export default AllTasks;
