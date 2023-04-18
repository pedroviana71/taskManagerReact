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

const Tasks = () => {
  useGetUserQuery();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const { data } = useGetAllTasksQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showFolder, setShowFolder] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user && !token) {
      navigate("/login");
    }
    setCategories(categoriesData);
    setTasks(data);
    setFiltered(data);
  }, [data, user, token, navigate, dispatch, categoriesData]);

  const filteredTasks = (word) => {
    const filtered = tasks.filter((task) => {
      if (word === "") {
        return task;
      } else {
        return task.title.toLowerCase().includes(word.toLowerCase());
      }
    });
    setFiltered(filtered);
  };

  const handleShowFolder = () => {
    setShowFolder(!showFolder);
  };

  console.log(categories);

  return (
    <div className={styles.container}>
      <div className={styles.categoriesBar}>
        <div className={styles.category} onClick={() => setFiltered(tasks)}>
          Todas
        </div>
        {categories?.map((category) => {
          const { _id, name } = category;
          return (
            <div
              key={_id}
              className={styles.category}
              onClick={() => filteredTasks(name)}
            >
              {name}
            </div>
          );
        })}
      </div>
      {showFolder ? (
        <AllCategories tasks={filtered} />
      ) : (
        <AllTasks filtered={filtered} />
      )}
      <div className={styles.bottomBar}>
        <MdAdd
          onClick={() => navigate("create-task")}
          className={styles.buttonBottomBar}
        />
        <MdSearch />
        <MdCategory />
        <MdStarOutline />
      </div>
    </div>
  );
};

export default Tasks;
