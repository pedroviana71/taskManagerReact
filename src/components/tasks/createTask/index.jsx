import { useState } from "react";
import Button from "../../buttons";
import Text from "../../text";
import styles from "./index.module.scss";
import { useCreateTaskMutation } from "../../../app/api/tasksSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateTask = ({ setShowCreateTaskModal }) => {
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState("");
  const [category, setCategory] = useState("");
  const [createTask] = useCreateTaskMutation();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.id);

  const handleSubmit = () => {
    console.log(userId, "userId no createTaskModal");
    const task = { title, comments, category, userId };
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
    <div className={styles.clickOutside}>
      <div className={styles.container} onKeyDown={handleKeyDown}>
        <div className={styles.titleContainer}>
          <Text className={styles.title}>Criar Tarefa</Text>
        </div>
        <div className={styles.inputContainer}>
          <Text>Título</Text>
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
          <Button onClick={handleSubmit} className={styles.submitButton}>
            Adicionar
          </Button>
          <Button onClick={handleGoBack} className={styles.submitButton}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
