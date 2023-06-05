import {
  MdAdd,
  MdClear,
  MdOutlineCategory,
  MdOutlineStar,
  MdSearch,
  MdStarOutline,
} from "react-icons/md";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Task, useGetAllTasksQuery } from "../../../app/api/tasksSlice";

interface BottomBarProps {
  setTasks: (tasks: Task[]) => void;
  filteredTasks: (
    word: string | null,
    id?: string,
    filterFavorites?: boolean
  ) => void;
}

const BottomBar = ({ setTasks, filteredTasks }: BottomBarProps) => {
  const navigate = useNavigate();
  const [isFavoriteSelected, setIsFavoriteSelected] = useState(false);
  const [isSearchSelected, setIsSearchSelected] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: tasksData } = useGetAllTasksQuery();

  const handleFavorites = () => {
    if (isFavoriteSelected && tasksData) {
      setTasks(tasksData);
      setIsFavoriteSelected(false);
    } else {
      filteredTasks("", "", true);
      setIsFavoriteSelected(true);
    }
  };

  const handleGoToCategories = () => {
    navigate("/categories");
  };

  const handleShowSearch = () => {
    setIsSearchSelected(!isSearchSelected);
    filteredTasks("");
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isSearchSelected]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    filteredTasks(e.target.value);
  };

  return (
    <div className={styles.bottomBar}>
      <MdSearch onClick={handleShowSearch} />
      {isSearchSelected ? (
        <div className={styles.searchContainer}>
          <input type="text" ref={inputRef} onChange={handleSearch} />
          <MdClear onClick={handleShowSearch} />
        </div>
      ) : (
        <>
          <MdAdd
            onClick={() => navigate("create-task")}
            className={styles.buttonBottomBar}
          />
          <MdOutlineCategory onClick={handleGoToCategories} />
          {isFavoriteSelected ? (
            <MdOutlineStar onClick={handleFavorites} />
          ) : (
            <MdStarOutline onClick={handleFavorites} />
          )}
        </>
      )}
    </div>
  );
};

export default BottomBar;
