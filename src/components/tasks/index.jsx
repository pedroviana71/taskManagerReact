import styles from "./tasks.module.scss";
import { useState } from "react";

import { useGetAllTasksQuery, useGetUserQuery } from "../../app/api/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectCurrentUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import AllTasks from "./AllTasks";
import { MdOutlineFolderOpen, MdSearch } from "react-icons/md";
import { MdFolder } from "react-icons/md";
import AllCategories from "./AllCategories";
import useWindowDimensions from "../../utils/customHooks/useWindowDimensions";

const Tasks = () => {
  useGetUserQuery();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const { width } = useWindowDimensions();
  const { data } = useGetAllTasksQuery();

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
    setTasks(data);
    setFiltered(data);
  }, [data, user, token, navigate, dispatch]);

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

  return (
    <div className={styles.outerContainer}>
      <div className={styles.search}>
        <button onClick={handleShowFolder} className={styles.folder}>
          {showFolder ? <MdFolder /> : <MdOutlineFolderOpen />}
        </button>
        {width < 900 ? (
          <button
            onClick={() => setShowSearchBar(true)}
            className={styles.searchButton}
          >
            <MdSearch />
          </button>
        ) : (
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search"
            onChange={(e) => filteredTasks(e.target.value)}
          />
        )}
        {showSearchBar && width < 900 ? (
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search"
            onChange={(e) => filteredTasks(e.target.value)}
          />
        ) : null}
      </div>
      {showFolder ? (
        <AllCategories tasks={filtered} />
      ) : (
        <AllTasks filtered={filtered} />
      )}
    </div>
  );
};

export default Tasks;
