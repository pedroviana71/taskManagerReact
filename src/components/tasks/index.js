import styles from "./tasks.module.css";

const Tasks = ({ tasks }) => {
  console.log(tasks);
  return (
    <>
      {tasks.map((task) => {
        return (
          <div className={styles.container}>
            <div className={styles.title}>{task.name}</div>
            <div className={styles.comments}>{task.comments}</div>
          </div>
        );
      })}
    </>
  );
};

export default Tasks;
