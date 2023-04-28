import clsx from "clsx";
import styles from "./index.module.scss";
import { useState } from "react";

const CategoriesBar = ({
  setTasks,
  tasksData,
  categories,
  filteredTasks,
  setCategoryId,
}) => {
  const [selectedIndex, setSelectedIndex] = useState("");
  const isAllTasks = setTasks && tasksData;

  return (
    <div
      className={clsx(
        styles.categoriesBar,
        isAllTasks ? null : styles.categoriesBarCreateTask
      )}
    >
      {isAllTasks ? (
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
      ) : null}
      {categories?.map((category, index) => {
        const { _id, name } = category;
        return (
          <h1
            key={_id}
            className={clsx(
              selectedIndex === index ? styles.categoryActive : styles.category
            )}
            onClick={() => {
              setSelectedIndex(index);
              if (isAllTasks) {
                filteredTasks(null, _id);
              } else {
                setCategoryId(_id);
              }
            }}
          >
            {name}
          </h1>
        );
      })}
    </div>
  );
};

export default CategoriesBar;
