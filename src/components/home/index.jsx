import { useState, useEffect } from "react";
import CreateTaskModal from "../tasks/modals/createTaskModal";
import Tasks from "../tasks/index";
import Button from "../buttons";
import Text from "../text/index";
import styles from "./index.module.scss";
import { MdOutlineAddBox } from "react-icons/md";
import { useGetAllTasksQuery } from "../../features/tasksSlice";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  const { data } = useGetAllTasksQuery();

  const handleCreateTaskModal = () => {
    setShowCreateTaskModal(!showCreateTaskModal);
  };

  useEffect(() => {
    setTasks(data);
  }, [setTasks, data]);

  return (
    <div className={styles.container}>
      {showCreateTaskModal && (
        <CreateTaskModal setShowCreateTaskModal={setShowCreateTaskModal} />
      )}
      <div className={styles.titleContainer}>
        <Text className={styles.title}>Tarefas</Text>
        <Button className={styles.button} onClick={handleCreateTaskModal}>
          <MdOutlineAddBox className={styles.icon} />
          <Text className={styles.buttonText}>Adicionar</Text>
        </Button>
      </div>
      <Tasks tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Home;
