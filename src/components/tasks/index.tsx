import styles from "./tasks.module.scss";
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
  MdCategory,
  MdStarOutline,
  MdOutlineStar,
} from "react-icons/md";
import AllCategories from "./AllCategories";
import CategoriesBar from "./CategoriesBar";
import { Category, Task } from "../../app/api/tasksSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

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
  const { data: tasksData, error } = useGetAllTasksQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const [categories, setCategories] = useState<Category[]>();
  const [tasks, setTasks] = useState<Task[]>();
  const [showFolder, setShowFolder] = useState(false);
  const [isFavoriteSelected, setIsFavoriteSelected] = useState(false);

  const token = localStorage.getItem("token");
  console.log(error);

  useEffect(() => {
    if (!user.token && !token) {
      navigate("/login");
    }
    if (error && "status" in error && error.status === 401) {
      navigate("/login");
    }
    setCategories(categoriesData);
    setTasks(tasksData);
  }, [tasksData, user, token, navigate, categoriesData, error]);

  const filteredTasks = (
    word: string | null,
    id?: string,
    filterFavorites?: boolean
  ) => {
    if (!word && !id && !filterFavorites) {
      setTasks(tasksData);
    } else if (word && !id) {
      const filtered = tasksData?.filter((task) => {
        return task.title.toLowerCase().includes(word.toLowerCase());
      });
      setTasks(filtered);
    } else if (filterFavorites) {
      const filtered = tasksData?.filter((task) => {
        return task.isFavorite;
      });
      setTasks(filtered);
    } else {
      const filtered = tasksData?.filter((task) => {
        return task.categoryId === id;
      });
      setTasks(filtered);
    }
  };

  const handleShowFolder = () => {
    setShowFolder(!showFolder);
  };

  const handleFavorites = () => {
    if (isFavoriteSelected) {
      setTasks(tasksData);
      setIsFavoriteSelected(false);
    } else {
      filteredTasks("", "", true);
      setIsFavoriteSelected(true);
    }
  };

  return (
    <div className={styles.container}>
      <CategoriesBar
        setTasks={setTasks}
        tasksData={tasksData}
        categories={categories}
        filteredTasks={filteredTasks}
      />
      {showFolder ? <AllCategories /> : <AllTasks filtered={tasks} />}
      <div className={styles.bottomBar}>
        <MdAdd
          onClick={() => navigate("create-task")}
          className={styles.buttonBottomBar}
        />
        <MdSearch />
        <MdCategory onClick={handleShowFolder} />
        {isFavoriteSelected ? (
          <MdOutlineStar onClick={handleFavorites} />
        ) : (
          <MdStarOutline onClick={handleFavorites} />
        )}
      </div>
    </div>
  );
};

export default Tasks;
