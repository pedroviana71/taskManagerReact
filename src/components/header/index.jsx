import { useSelector } from "react-redux";
import Button from "../buttons";
import Text from "../text/index";
import styles from "./index.module.scss";
import { MdOutlineAddBox } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleClick = () => {
    navigate("/create-task");
  };

  return (
    <div className={styles.container}>
      <Text className={styles.title}>Tarefas</Text>
      {user.username ? (
        <Button className={styles.button} onClick={handleClick}>
          <MdOutlineAddBox className={styles.icon} />
          <Text className={styles.buttonText}>Add.</Text>
        </Button>
      ) : null}
    </div>
  );
};

export default Home;
