import dayjs from "dayjs";
import "dayjs/locale/pt-br";

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
  MdMoreVert,
  MdOutlineCheckBox,
  MdOutlineModeComment,
} from "react-icons/md";

const AllTasks = ({ filtered }) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [editTask] = useEditTaskMutation();
  const [categories, setCategories] = useState([]);
  const { data } = useGetCategoriesQuery();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState("");

  useEffect(() => {
    setCategories(data);
  }, [data]);

  const handleDelete = (index) => {
    setShowDeleteModal(!showDeleteModal);
    setSelectedIndex(index);
  };

  return (
    <div className={styles.container}>
      {filtered?.map((task, index) => {
        const { _id, deadline, title } = task;

        const handleComplete = (id) => {
          editTask({ id, completed: !task.completed });
        };

        const category = categories?.find(
          (category) => category._id === task.categoryId
        );

        return (
          <div key={_id}>
            <section className={styles.taskContainer}>
              <button
                className={styles.checkBox}
                onClick={() => handleComplete(_id)}
              >
                {task.completed ? (
                  <MdOutlineCheckBox className={styles.checkBoxIcon} />
                ) : (
                  <MdCheckBoxOutlineBlank className={styles.checkBoxIcon} />
                )}
              </button>
              <button
                className={styles.innetTaskContainer}
                onClick={() => navigate(`/edit/${_id}`)}
              >
                <h1
                  className={clsx(
                    task.completed ? styles.titleCompleted : styles.completed
                  )}
                >
                  {title}
                </h1>
                <div className={styles.taskFooter}>
                  {deadline ? (
                    <h4 className={styles.date}>
                      {dayjs(deadline).locale("pt-BR").format("ddd, DD MMM")}
                    </h4>
                  ) : null}
                  {category ? (
                    <h4
                      className={styles.category}
                      style={{ backgroundColor: `${category.color}66` }}
                    >
                      {category.name}
                    </h4>
                  ) : null}
                  {task.comments ? <MdOutlineModeComment /> : null}
                </div>
              </button>
              <MdMoreVert
                className={styles.moreVertButton}
                onClick={() => handleDelete(index)}
              />
              {showDeleteModal && selectedIndex === index ? (
                <div className={styles.deleteModal}>
                  <h1
                    onClick={() => {
                      deleteTask(_id);
                    }}
                  >
                    Deletar
                  </h1>
                </div>
              ) : null}
            </section>
            <hr className={styles.line} />
          </div>
        );
      })}
    </div>
  );
};

export default AllTasks;
