import { useState } from "react";
import { MdClose } from "react-icons/md";
import Button from "../../../buttons";
import Text from "../../../text";
import styles from "./index.module.scss";
import { useCreateTaskMutation } from "../../../../app/api/tasksSlice";

const CreateTaskModal = ({ setShowCreateTaskModal }) => {
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState("");
  const [category, setCategory] = useState("");
  const [createTask] = useCreateTaskMutation();

  const handleSubmit = () => {
    const task = { title, comments, category };
    createTask(task);
    setShowCreateTaskModal(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowCreateTaskModal(false);
      console.log("entrei");
    }
  };

  const handleClose = () => setShowCreateTaskModal(false);

  const handleClickOutside = (e) => {
    if (e.target.className.includes("clickOutside")) {
      handleClose();
    }
  };

  return (
    <div className={styles.clickOutside} onClick={handleClickOutside}>
      <div className={styles.container} onKeyDown={handleKeyDown}>
        <div className={styles.titleContainer}>
          <Text className={styles.title}>Criar Tarefa</Text>
          <button onClick={handleClose} className={styles.closeButton}>
            <MdClose />
          </button>
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
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
