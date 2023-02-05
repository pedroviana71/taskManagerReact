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
  const { id } = useParams();
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
      <Text>Titulo</Text>
      <textarea
        className={styles.input}
        type="text"
        value={newTitle}
        onChange={(e) => {
          setNewTitle(e.target.value);
        }}
        autoFocus
      />
      <Text>Categoria</Text>
      <textarea
        className={styles.input}
        type="text"
        value={newCategory}
        onChange={(e) => {
          setNewCategory(e.target.value);
        }}
      />
      <Text>Comentarios</Text>
      <textarea
        className={styles.input}
        type="text"
        value={newComments}
        onChange={(e) => {
          setNewComments(e.target.value);
        }}
      />
      <button onClick={handleSubmit} className={styles.button}>
        Editar
      </button>
      <button onClick={() => navigate("/tasks")} className={styles.button}>
        Voltar
      </button>
    </div>
  );
};

export default EditTask;
