import { useState } from "react";
import Button from "../../buttons";
import Text from "../../text";
import styles from "./index.module.scss";
import { MdClose } from "react-icons/md";
import { useEditTaskMutation } from "../../../app/api/tasksSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const [editTask] = useEditTaskMutation();
  const [newTitle, setNewTitle] = useState("");
  const [newComments, setNewComments] = useState("");
  const [newCategory, setNewCategory] = useState("");
  let { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await editTask({
        id,
        title: newTitle,
        category: newCategory,
        comments: newComments,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Text className={styles.title}>Editar Tarefa</Text>
        <button onClick={() => {}} className={styles.closeButton}>
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
      <Button onClick={() => navigate("/tasks")}>Voltar</Button>
    </div>
  );
};

export default EditTask;
