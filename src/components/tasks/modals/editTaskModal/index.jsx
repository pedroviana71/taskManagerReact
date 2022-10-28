import { useState } from "react";
import { useEditTaskMutation } from "../../../../features/tasksSlice";
import Button from "../../../buttons";
import Text from "../../../text";
import styles from "./index.module.scss";
import { MdClose } from "react-icons/md";

const EditTask = ({ task, setShowEditTaskModal }) => {
  const [editTask] = useEditTaskMutation();
  const [newTitle, setNewTitle] = useState(task.title);
  const [newComments, setNewComments] = useState(task.comments);
  const [newCategory, setNewCategory] = useState(task.category);

  const handleSubmit = async () => {
    await editTask({
      id: task._id,
      title: newTitle,
      category: newCategory,
      comments: newComments,
      completed: task.completed,
    });
    setShowEditTaskModal(false);
  };

  const handleClose = () => setShowEditTaskModal(false);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowEditTaskModal(false);
    }
  };

  return (
    <div className={styles.container} onKeyDown={handleKeyDown}>
      <div className={styles.titleContainer}>
        <Text className={styles.title}>Editar Tarefa</Text>
        <button onClick={handleClose} className={styles.closeButton}>
          <MdClose />
        </button>
      </div>
      <Text>Titulo</Text>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => {
          setNewTitle(e.target.value);
        }}
        autoFocus
      />
      <Text>Categoria</Text>
      <input
        className={styles.input}
        type="text"
        value={newCategory}
        onChange={(e) => {
          setNewCategory(e.target.value);
        }}
      />
      <Text>Comentarios</Text>
      <input
        type="text"
        value={newComments}
        onChange={(e) => {
          setNewComments(e.target.value);
        }}
      />
      <Button onClick={handleSubmit}>Editar</Button>
    </div>
  );
};

export default EditTask;
