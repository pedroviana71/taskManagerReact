import clsx from "clsx";
import styles from "./index.module.scss";
import { useState } from "react";

const CategoriesBar = ({ setTasks, tasksData, categories, filteredTasks }) => {
  const [selectedIndex, setSelectedIndex] = useState("");

  return (
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
              selectedIndex === index ? styles.categoryActive : styles.category
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
  );
};

export default CategoriesBar;
