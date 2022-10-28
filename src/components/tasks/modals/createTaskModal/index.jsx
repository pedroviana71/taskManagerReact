import { useState } from "react";
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

  return (
    <div className={styles.container} onKeyDown={handleKeyDown}>
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
