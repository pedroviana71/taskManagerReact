import { useState } from "react";
import Text from "../../text";
import styles from "./index.module.scss";
import {
  useEditTaskMutation,
  useGetTaskQuery,
} from "../../../app/api/tasksSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const EditTask = () => {
  const { id } = useParams();
  const { data } = useGetTaskQuery(id);
  const [editTask] = useEditTaskMutation();
  const [newTitle, setNewTitle] = useState("");
  const [newComments, setNewComments] = useState("");
  const [newCategory, setNewCategory] = useState("");
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

  useEffect(() => {
    setNewTitle(data?.title);
    setNewCategory(data?.category);
    setNewComments(data?.comments);
  }, [data]);

  return (
    <div>
      {data ? (
        <div>
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
            <button onClick={() => navigate("/")} className={styles.button}>
              Voltar
            </button>
          </div>
        </div>
      ) : (
        <div>Carregando</div>
      )}
    </div>
  );
};

export default EditTask;
