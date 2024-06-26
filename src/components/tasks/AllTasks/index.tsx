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
import ClickOutside from "../../../utils/customHooks/useClickOutside";
import { Task, Category } from "../../../app/api/tasksSlice";
import Divider from "../../custom/Divider";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useDispatch } from "react-redux";
import {
  toggleSideBar,
  typeClickOutsideAction,
} from "../../../features/sideBarSlice";

interface Filtered {
  filtered: Task[] | undefined;
}

const AllTasks = ({ filtered }: Filtered) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [editTask] = useEditTaskMutation();
  const [categories, setCategories] = useState<Category[]>();
  const { data } = useGetCategoriesQuery();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [outsideClickControl, setOutsideClickControl] = useState(false);
  const { typeClickOutside } = useSelector((state: RootState) => state.sideBar);
  const dispatch = useDispatch();

  useEffect(() => {
    setCategories(data);
  }, [data]);

  const handleDeleteButton = (index: number) => {
    setShowDeleteModal(!showDeleteModal);
    setSelectedIndex(index);
  };

  const handleNavigateTask = (id: string) => {
    if (showDeleteModal || outsideClickControl) {
      setShowDeleteModal(false);
      setOutsideClickControl(false);
    } else if (typeClickOutside === "CLICK_OUTSIDE") {
      dispatch(toggleSideBar(false));
      dispatch(typeClickOutsideAction(""));
    } else {
      navigate(`/edit/${id}`);
    }
  };

  const hadleClickOutside = () => {
    setOutsideClickControl(true);
    setShowDeleteModal(false);
  };

  return (
    <div className={styles.container}>
      {filtered?.map((task, index) => {
        const { _id, deadline, title } = task;

        const handleComplete = (_id: string) => {
          editTask({ _id, completed: !task.completed });
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
                onClick={() => handleNavigateTask(_id)}
              >
                <h1
                  className={clsx(
                    task.completed ? styles.titleCompleted : styles.title
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
                onClick={() => handleDeleteButton(index)}
              />
              {showDeleteModal && selectedIndex === index ? (
                <ClickOutside onClick={hadleClickOutside}>
                  <div className={styles.deleteModal}>
                    <h1
                      onClick={() => {
                        deleteTask(_id);
                        setShowDeleteModal(false);
                      }}
                    >
                      Deletar
                    </h1>
                  </div>
                </ClickOutside>
              ) : null}
            </section>
            <Divider className={styles.line} />
          </div>
        );
      })}
    </div>
  );
};

export default AllTasks;
