import { useState } from "react";
import Button from "../../buttons";
import Text from "../../text";
import styles from "./index.module.scss";
import { useCreateTaskMutation } from "../../../app/api/tasksSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";

const CreateTask = ({ setShowCreateTaskModal }) => {
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState(new Date());

  const [createTask] = useCreateTaskMutation();
  const navigate = useNavigate();

  const userId =
    useSelector((state) => state.user.id) || localStorage.getItem("id");

  const handleSubmit = () => {
    const task = { title, comments, category, userId, deadline };
    createTask(task);
    navigate("/");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowCreateTaskModal(false);
      console.log("entrei");
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.container} onKeyDown={handleKeyDown}>
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
      <textarea
        className={styles.input}
        type="text"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
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
