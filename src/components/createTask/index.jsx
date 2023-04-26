import { useState } from "react";
import styles from "./index.module.scss";
import {
  useCreateTaskMutation,
  useGetCategoriesQuery,
} from "../../app/api/tasksSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import { SliderPicker } from "react-color";
import clsx from "clsx";
import CategoriesBar from "../tasks/CategoriesBar";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [color, setColor] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const { data: categories } = useGetCategoriesQuery();

  const [createTask] = useCreateTaskMutation();
  const navigate = useNavigate();

  const userId =
    useSelector((state) => state.user.id) || localStorage.getItem("id");

  const handleSubmit = () => {
    const task = {
      title,
      comments,
      categoryId,
      userId,
      deadline,
    };
    createTask(task);
    navigate("/");
  };

  const handleColor = (color) => {
    setColor(color.hex);
  };

  const handleGoBack = () => {
    navigate("/");
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
      <textarea
        className={clsx(styles.input, styles.comments)}
        type="text"
        onChange={(e) => {
          setComments(e.target.value);
        }}
        placeholder="Escreva comentários (opcional) ..."
        maxLength={240}
      />

      <CategoriesBar categories={categories} setCategoryId={setCategoryId} />
      <SliderPicker color={color} onChangeComplete={handleColor} />

      <DateTimePicker onChange={setDeadline} value={deadline} />

      <button onClick={handleSubmit} className={styles.button}>
        Adicionar
      </button>
      <button onClick={handleGoBack} className={styles.button}>
        Cancelar
      </button>
    </div>
  );
};

export default CreateTask;
