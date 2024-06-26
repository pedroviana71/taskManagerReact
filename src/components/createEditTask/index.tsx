import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import {
  useCreateTaskMutation,
  useEditTaskMutation,
  useGetCategoriesQuery,
  useGetTaskQuery,
} from "../../app/api/tasksSlice";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-date-picker";
import clsx from "clsx";
import {
  MdEditCalendar,
  MdOutlineAddComment,
  MdOutlineImage,
  MdOutlineStar,
  MdStarOutline,
} from "react-icons/md";
import CategoriesBar from "../tasks/CategoriesBar";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import InlineAlert from "../custom/inlineAlert";
import { RootState } from "../../app/store";
import ReactLoading from "react-loading";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [deadline, setDeadline] = useState(dayjs().add(1, "day").format());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const _id = id || "";
  const [createTask] = useCreateTaskMutation();
  const [editTask] = useEditTaskMutation();
  const { data: categories } = useGetCategoriesQuery();
  const { data, isLoading } = useGetTaskQuery(_id);

  useEffect(() => {
    if (pathname.includes("edit") && data) {
      setTitle(data.title);
      setComments(data.comments);
      setCategoryId(data.categoryId);
      setIsFavorite(data.isFavorite);
      setDeadline(data.deadline);
      setIsEditingTask(true);
    }
  }, [pathname, data]);

  const userId =
    useSelector((state: RootState) => state.user.id) ||
    localStorage.getItem("id");

  const handleSubmit = () => {
    const task = {
      title,
      comments,
      categoryId,
      userId,
      deadline,
      isFavorite,
    };

    if (isEditingTask) {
      editTask({ _id, ...task });
      navigate("/");
    } else if (title) {
      createTask(task);
      navigate("/");
    } else {
      setShowAlert(true);
    }
  };

  const handleGoCategories = () => {
    navigate("/categories", { state: { previousPath: pathname } });
  };

  const handleTitleChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setTitle(target.value);
  };

  return (
    <>
      {isLoading ? (
        <ReactLoading
          type={"bubbles"}
          color={"#7f7e82"}
          height={50}
          width={50}
          className={styles.loading}
        />
      ) : (
        <div className={styles.container}>
          <textarea
            className={styles.input}
            onChange={handleTitleChange}
            autoFocus
            placeholder="Escreva o título ..."
            maxLength={140}
            value={title}
          />

          {showAlert && <InlineAlert text="É preciso preencher o titulo" />}

          <div className={styles.commentsContainer}>
            <textarea
              className={clsx(styles.input, styles.comments)}
              onChange={(e) => {
                setComments(e.target.value);
              }}
              placeholder="Escreva comentários (opcional) ..."
              maxLength={240}
              value={comments}
            />
            <MdOutlineAddComment className={styles.addTopics} />
          </div>

          <div className={styles.iconsContainer}>
            <MdEditCalendar onClick={() => setShowCalendar(!showCalendar)} />
            {isFavorite ? (
              <MdOutlineStar onClick={() => setIsFavorite(!isFavorite)} />
            ) : (
              <MdStarOutline onClick={() => setIsFavorite(!isFavorite)} />
            )}
            <AiOutlineAppstoreAdd onClick={handleGoCategories} />
            <MdOutlineImage />
          </div>

          {showCalendar && (
            <div className={styles.calendar}>
              <DatePicker
                //! fix type any
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(date: any) => {
                  setDeadline(date);
                }}
                value={deadline}
                minDate={dayjs().toDate()}
              />
            </div>
          )}

          <CategoriesBar
            categories={categories}
            setCategoryId={setCategoryId}
            setTasks={() => undefined}
          />

          {isEditingTask ? (
            <button onClick={handleSubmit} className={styles.button}>
              Salvar
            </button>
          ) : (
            <button onClick={handleSubmit} className={styles.button}>
              Criar tarefa
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default CreateTask;
