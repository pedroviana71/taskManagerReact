import styles from "./tasks.module.scss";
import Button from "../buttons";
import { memo, useState } from "react";
import EditTask from "../Task/editTask";

const Tasks = ({ tasks, deleteTask, handleEditTask }) => {
  const [showEditField, setShowEditField] = useState(false);
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState("");
  const [completed, setCompleted] = useState(false);

  return (
    <>
      {tasks.map((task) => {
        const { _id, category, comments } = task;
        return (
          <div key={_id} className={styles.container}>
            <div className={styles.title}>{task.title}</div>
            {category ? (
              <div className={styles.comments}>{category}</div>
            ) : null}
            {comments ? (
              <div className={styles.comments}>{comments}</div>
            ) : null}
            {task.completed ? (
              <div className={styles.comments}>Completo!</div>
            ) : null}
            <input
              type="checkBox"
              defaultChecked={task.completed}
              value={completed}
              onChange={() => {
                setCompleted(!task.completed);
              }}
              onClick={() =>
                handleEditTask(
                  _id,
                  task.title,
                  task.category,
                  task.comments,
                  !task.completed
                )
              }
            />
            <Button onClick={() => deleteTask(_id)}>Deletar</Button>
            <Button
              id={_id}
              onClick={(e) => {
                setShowEditField(true);
                setEditingId(e.target.id);
              }}
            >
              Editar
            </Button>
          </div>
        );
      })}

      {showEditField ? (
        <EditTask
          title={title}
          setTitle={setTitle}
          comments={comments}
          setComments={setComments}
          category={category}
          setCategory={setCategory}
          onChange={setTitle}
          onClick={() => handleEditTask(editingId, title, comments, category)}
          id={editingId}
          setShowEditField={setShowEditField}
        />
      ) : null}
    </>
  );
};

export default memo(Tasks);
