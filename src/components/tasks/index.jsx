import styles from "./tasks.module.scss";
import Button from "../buttons";
import { memo, useState } from "react";

import EditTaskModal from "./modals/editTaskModal";
import {
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetAllTasksQuery,
} from "../../app/api/tasksSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectCurrentUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const [deleteTask] = useDeleteTaskMutation();
  const [editTask] = useEditTaskMutation();
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});
  const [tasks, setTasks] = useState([]);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const { data } = useGetAllTasksQuery();

  const handleEditModal = (task) => {
    setShowEditTaskModal(!showEditTaskModal);
    setTaskToEdit(task);
    setTaskToEdit(task);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setTasks(data);
  }, [data, user, navigate]);

  return (
    <>
      {showEditTaskModal && (
        <EditTaskModal
          task={taskToEdit}
          setShowEditTaskModal={setShowEditTaskModal}
        />
      )}
      <div className={styles.tasksContainer}>
        {tasks?.map((task) => {
          const { _id, category, comments } = task;

          const handleComplete = (id) => {
            editTask({ id, completed: !task.completed });
          };

          return (
            <div key={_id} className={styles.container}>
              <div className={styles.title}>{task.title}</div>
              <div className={styles.comments}>{category}</div>
              <div className={styles.comments}>{comments}</div>
              {task.completed ? (
                <div className={styles.comments}>Completo!</div>
              ) : null}
              <input
                type="checkBox"
                defaultChecked={task.completed}
                value={task.completed}
                onChange={() => handleComplete(task._id)}
              />
              <Button
                onClick={() => {
                  deleteTask(_id);
                }}
              >
                Deletar
              </Button>
              <Button id={_id} onClick={() => handleEditModal(task)}>
                Editar
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default memo(Tasks);
