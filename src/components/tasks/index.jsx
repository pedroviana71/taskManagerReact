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
import { MdAdd, MdSearch, MdCategory, MdStarOutline } from "react-icons/md";
import AllCategories from "./AllCategories";
import clsx from "clsx";

const Tasks = () => {
  useGetUserQuery();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const { data: tasksData } = useGetAllTasksQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showFolder, setShowFolder] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState("");
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

  const filteredTasks = (word, id) => {
    if (!word && !id) {
      setTasks(tasksData);
    } else if (word && !id) {
      const filtered = tasksData.filter((task) => {
        return task.title.toLowerCase().includes(word.toLowerCase());
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

  return (
    <div className={styles.container}>
      <div className={styles.categoriesBar}>
        <h1
          className={clsx(
            selectedIndex || selectedIndex === 0
              ? styles.category
              : styles.categoryActive
          )}
          onClick={() => {
            setSelectedIndex("");
            setTasks(tasksData);
          }}
        >
          Todas
        </h1>
        {categories?.map((category, index) => {
          const { _id, name } = category;
          return (
            <h1
              key={_id}
              className={clsx(
                selectedIndex === index
                  ? styles.categoryActive
                  : styles.category
              )}
              onClick={() => {
                setSelectedIndex(index);
                filteredTasks(null, _id);
              }}
            >
              {name}
            </h1>
          );
        })}
      </div>
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
        <MdStarOutline />
      </div>
    </div>
  );
};

export default Tasks;
