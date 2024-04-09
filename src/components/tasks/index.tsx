import styles from "./index.module.scss";
import { useState } from "react";

import {
  useGetAllTasksQuery,
  useGetCategoriesQuery,
} from "../../app/api/tasksSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AllTasks from "./AllTasks";
import {
  MdAdd,
  MdSearch,
  MdStarOutline,
  MdOutlineStar,
  MdOutlineCategory,
} from "react-icons/md";
import CategoriesBar from "./CategoriesBar";
import { Category, Task } from "../../app/api/tasksSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ReactLoading from "react-loading";
import BottomBar from "./bottomBar";

interface User {
  id: string;
  username: string;
  email: string;
  token: string;
}

interface State {
  user: User;
  tasks: RootState;
  auth: RootState;
}

const Tasks = () => {
  const user = useSelector<State, User>((state) => state.user);
  const navigate = useNavigate();
  const { data: tasksData, error, isLoading } = useGetAllTasksQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const [categories, setCategories] = useState<Category[]>();
  const [tasks, setTasks] = useState<Task[]>([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user.token && !token) {
      navigate("/login");
    }
    if (error && "status" in error && error.status === 401) {
      navigate("/login");
    }
    setCategories(categoriesData);
    setTasks(tasksData || []);
  }, [tasksData, user, token, navigate, categoriesData, error]);

  const filteredTasks = (
    word: string | null,
    id?: string,
    filterFavorites?: boolean
  ) => {
    if (!word && !id && !filterFavorites) {
      setTasks(tasksData || []);
    } else if (word && !id) {
      const filtered = tasksData?.filter((task) => {
        return task.title.toLowerCase().includes(word.toLowerCase());
      });
      setTasks(filtered || []);
    } else if (filterFavorites) {
      const filtered = tasksData?.filter((task) => {
        return task.isFavorite;
      });
      setTasks(filtered || []);
    } else {
      const filtered = tasksData?.filter((task) => {
        return task.categoryId === id;
      });
      setTasks(filtered || []);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <ReactLoading
          type="spinningBubbles"
          color={"#2D2B35"}
          height={"64px"}
          width={"64px"}
        />
      ) : null}
      {!isLoading && tasks ? (
        <CategoriesBar
          setTasks={setTasks}
          tasksData={tasksData}
          categories={categories}
          filteredTasks={filteredTasks}
        />
      ) : null}
      {tasks && tasks.length > 0 && <AllTasks filtered={tasks} />}
      {tasks && tasks.length === 0 && !isLoading && (
        <p className={styles.alertAddTask}>Adicione uma tarefa!</p>
      )}
      <BottomBar setTasks={setTasks} filteredTasks={filteredTasks} />
    </div>
  );
};

export default Tasks;
