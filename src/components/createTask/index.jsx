import { useState } from "react";
import styles from "./index.module.scss";
import {
  useCreateTaskMutation,
  useGetCategoriesQuery,
} from "../../app/api/tasksSlice";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [deadline, setDeadline] = useState(dayjs().add(1, "day").format());
  const { data: categories } = useGetCategoriesQuery();
  const [createTask] = useCreateTaskMutation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userId =
    useSelector((state) => state.user.id) || localStorage.getItem("id");

  const handleSubmit = () => {
    const task = {
      title,
      comments,
      categoryId,
      userId,
      deadline,
      isFavorite,
    };
    createTask(task);
    navigate("/");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleGoCategories = () => {
    navigate("/categories", { state: { previousPath: pathname } });
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.input}
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        autoFocus
        placeholder="Escreva o título ..."
        maxLength={140}
      />
      <div className={styles.commentsContainer}>
        <textarea
          className={clsx(styles.input, styles.comments)}
          type="text"
          onChange={(e) => {
            setComments(e.target.value);
          }}
          placeholder="Escreva comentários (opcional) ..."
          maxLength={240}
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
            onChange={setDeadline}
            value={deadline}
            minDate={dayjs().toDate()}
          />
        </div>
      )}

      <CategoriesBar categories={categories} setCategoryId={setCategoryId} />

      <button onClick={handleSubmit} className={styles.button}>
        Criar tarefa
      </button>
      <button onClick={handleGoBack} className={styles.button}>
        Cancelar
      </button>
    </div>
  );
};

export default CreateTask;
