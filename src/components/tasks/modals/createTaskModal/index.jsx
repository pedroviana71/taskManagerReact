import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useCreateTaskMutation } from "../../../../features/tasksSlice";
import Button from "../../../buttons";
import Text from "../../../text";
import styles from "./index.module.scss";

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

  return (
    <div className={styles.container} onKeyDown={handleKeyDown}>
      <div className={styles.titleContainer}>
        <Text className={styles.title}>Editar Tarefa</Text>
        <button onClick={handleClose} className={styles.closeButton}>
          <MdClose />
        </button>
      </div>
      <Text>Título</Text>
      <input
        className={styles.input}
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        autoFocus
      />
      <Text>Categoria</Text>
      <input
        className={styles.input}
        type="text"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      <Text>Comentários</Text>
      <input
        className={styles.input}
        type="text"
        onChange={(e) => {
          setComments(e.target.value);
        }}
      />
      <Button onClick={handleSubmit}>Adicionar</Button>
    </div>
  );
};

export default CreateTaskModal;
