import styles from "./tasks.module.scss";
import { useState } from "react";

import {
  useGetAllTasksQuery,
  useGetCategoriesQuery,
  useGetUserQuery,
} from "../../app/api/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectCurrentUser } from "../../features/userSlice";
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
import clsx from "clsx";
import CategoriesBar from "./CategoriesBar";

const Tasks = () => {
  useGetUserQuery();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const { data: tasksData } = useGetAllTasksQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showFolder, setShowFolder] = useState(false);
  const [isFavoriteSelected, setIsFavoriteSelected] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user && !token) {
      navigate("/login");
    }
    setCategories(categoriesData);
    setTasks(tasksData);
  }, [tasksData, user, token, navigate, dispatch, categoriesData]);

  const filteredTasks = (word, id, filterFavorites) => {
    if (!word && !id && !filterFavorites) {
      setTasks(tasksData);
    } else if (word && !id) {
      const filtered = tasksData.filter((task) => {
        return task.title.toLowerCase().includes(word.toLowerCase());
      });
      setTasks(filtered);
    } else if (filterFavorites) {
      const filtered = tasksData.filter((task) => {
        return task.isFavorite;
      });
      setTasks(filtered);
    } else {
      const filtered = tasksData.filter((task) => {
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
      filteredTasks(null, null, true);
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
      {showFolder ? (
        <AllCategories tasks={tasks} />
      ) : (
        <AllTasks filtered={tasks} />
      )}
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
