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
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [isEditingComments, setIsEditingComments] = useState(false);
  const createdAtDate = new Date(data?.createdAt).toLocaleDateString("pt-BR");
  const createdAtTime = new Date(data?.createdAt).toLocaleTimeString("pt-BR", );

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
    <div className={styles.outerContainer}>
      {data ? (
        <div className={styles.container}>
          <p>
            Criado em {createdAtDate} às {createdAtTime}
          </p>
          {isEditingTitle ? (
            <textarea
              className={styles.input}
              type="text"
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
              autoFocus
            />
          ) : (
            <h2 onClick={() => setIsEditingTitle(true)}>{newTitle}</h2>
          )}

          {isEditingCategory ? (
            <textarea
              className={styles.input}
              type="text"
              value={newCategory}
              onChange={(e) => {
                setNewCategory(e.target.value);
              }}
            />
          ) : (
            <h4 onClick={() => setIsEditingCategory(true)}>{newCategory}</h4>
          )}

          {isEditingComments ? (
            <textarea
              className={styles.input}
              type="text"
              value={newComments}
              onChange={(e) => {
                setNewComments(e.target.value);
              }}
            />
          ) : (
            <h5 onClick={() => setIsEditingComments(true)}>{newComments}</h5>
          )}
          <div className={styles.buttonsContainer}>
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
