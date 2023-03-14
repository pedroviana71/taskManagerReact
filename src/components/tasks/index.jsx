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

  useEffect(() => {
    if (!user && !token) {
      navigate("/login");
    }
    setTasks(data);
    setFiltered(data);
    console.log(data);
  }, [data, user, token, navigate, dispatch]);

  const handleShowFolder = () => {
    setShowFolder(!showFolder);
  };

  return (
    <div className={styles.outerContainer}>
      <div>
        <input
          className={styles.search}
          type="text"
          placeholder="Search"
          onChange={(e) => filteredTasks(e.target.value)}
        />
        <button onClick={handleShowFolder}>
          {showFolder ? <MdOutlineFolderOpen /> : <MdFolder />}
        </button>
      </div>
      {showFolder ? (
        <AllCategories filtered={filtered} />
      ) : (
        <AllTasks filtered={filtered} />
      )}
    </div>
  );
};

export default memo(Tasks);
