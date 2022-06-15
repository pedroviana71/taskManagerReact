import styles from "./tasks.module.css";

const Tasks = ({ tasks }) => {
  return (
    <>
      {tasks.map((task) => {
        return (
          <div className={styles.container}>
            <div className={styles.title}>{task.title}</div>
            <div className={styles.comments}>{task.comments}</div>
          </div>
        );
      })}
    </>
  );
};

export default Tasks;
