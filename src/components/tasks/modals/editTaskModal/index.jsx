import { useState } from "react";
import { useEditTaskMutation } from "../../../../features/tasksSlice";
import Button from "../../../buttons";
import Text from "../../../text";
import styles from "./index.module.scss";

const EditTask = ({ id, task }) => {
  const [editTask] = useEditTaskMutation();
  const [newTitle, setNewTitle] = useState(task.title);
  const [newComments, setNewComments] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const { category, comments } = task;
  console.log(task);

  const handleSubmit = () => {
    editTask({
      id,
      title: newTitle,
      category: newCategory,
      comments: newComments,
    });
  };

  return (
    <div className={styles.container}>
      <Text>Titulo</Text>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => {
          setNewTitle(e.target.value);
        }}
      />
      <Text>Categoria</Text>
      <input
        className={styles.input}
        type="text"
        value={category}
        onChange={(e) => {
          setNewCategory(e.target.value);
        }}
      />
      <Text>Comentarios</Text>
      <input
        type="text"
        value={comments}
        onChange={(e) => {
          setNewComments(e.target.value);
        }}
      />
      <Button onClick={handleSubmit}>Editar</Button>
    </div>
  );
};

export default EditTask;
