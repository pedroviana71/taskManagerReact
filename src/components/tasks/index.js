import styles from "./tasks.module.css";
import Button from "../buttons";

const Tasks = ({ tasks, onClick }) => {
  return (
    <>
      {tasks.map((task) => {
        const _id = task._id;
        return (
          <div key={_id} className={styles.container}>
            <div className={styles.title}>{task.title}</div>
            {task.comments ? (
              <div className={styles.comments}>{task.comments}</div>
            ) : null}
            <Button onClick={() => onClick(_id)}>Deletar</Button>
          </div>
        );
      })}
    </>
  );
};

export default Tasks;
