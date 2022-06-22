import styles from "./tasks.module.scss";
import Button from "../buttons";
import { memo, useState } from "react";
import EditTask from "../Task/EditTask";
import { editTask } from "../../actions/tasks";

const Tasks = ({ tasks, deleteTask, handleEditTask }) => {
  const [showEditField, setShowEditField] = useState(false);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState("");

  return (
    <>
      {tasks.map((task) => {
        const { _id } = task;
        return (
          <div key={_id} className={styles.container}>
            <div className={styles.title}>{task.title}</div>
            {task.comments ? (
              <div className={styles.comments}>{task.comments}</div>
            ) : null}
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
          onChange={setTitle}
          onClick={() => handleEditTask(editingId, title)}
          id={editingId}
        />
      ) : null}
    </>
  );
};

export default memo(Tasks);
