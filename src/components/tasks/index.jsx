import styles from "./tasks.module.scss";
import { memo, useState } from "react";

import { useGetAllTasksQuery, useGetUserQuery } from "../../app/api/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectCurrentUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import AllTasks from "./AllTasks";
import { MdOutlineFolderOpen } from "react-icons/md";
import { MdFolder } from "react-icons/md";
import AllCategories from "./AllCategories";

const Tasks = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  useGetUserQuery();

  const [tasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showFolder, setShowFolder] = useState(false);

  const { data } = useGetAllTasksQuery();

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
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search"
          onChange={(e) => filteredTasks(e.target.value)}
        />
      </div>
      {showFolder ? (
        <AllCategories tasks={filtered} />
      ) : (
        <AllTasks filtered={filtered} />
      )}
    </div>
  );
};

export default memo(Tasks);
