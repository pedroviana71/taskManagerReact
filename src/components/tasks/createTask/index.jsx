import { useState } from "react";
import Button from "../../buttons";
import Text from "../../text";
import styles from "./index.module.scss";
import {
  useCreateTaskMutation,
  useGetCategoriesQuery,
} from "../../../app/api/tasksSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import { SliderPicker } from "react-color";

const CreateTask = ({ setShowCreateTaskModal }) => {
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
      <h3>Título</h3>
      <textarea
        className={styles.input}
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        autoFocus
      />
      <Text>Categoria</Text>
      {categories?.map((category) => {
        return (
          <button
            onClick={() => setCategoryId(category._id)}
            key={category._id}
          >
            {category.name}
          </button>
        );
      })}
      <button onClick={() => navigate("/categories")}>Criar Categoria</button>
      <SliderPicker color={color} onChangeComplete={handleColor} />
      <Text>Comentários</Text>
      <textarea
        className={styles.input}
        type="text"
        onChange={(e) => {
          setComments(e.target.value);
        }}
      />
      <DateTimePicker onChange={setDeadline} value={deadline} />

      <p>{JSON.stringify(deadline)}</p>

      <Button onClick={handleSubmit} className={styles.button}>
        Adicionar
      </Button>
      <Button onClick={handleGoBack} className={styles.button}>
        Cancelar
      </Button>
    </div>
  );
};

export default CreateTask;
