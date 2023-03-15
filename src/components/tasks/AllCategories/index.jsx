import _ from "lodash";
import styles from "./index.module.scss";
import { useState } from "react";
import Category from "./Category";
import { useEffect } from "react";

const AllCategories = ({ filtered }) => {
  const categoriesId = filtered.map((task) => task.categoryId);
  const uniqueCategoriesId = _.uniq(categoriesId);

  const [showTasks, setShowTasks] = useState(false);

  // useEffect(() => {});

  console.log(categoriesId);
  console.log(uniqueCategoriesId);

  return (
    <div>
      teste
      {/* {showTasks ? (
        <Category tasks={tasks} />
      ) : (
        <div>
          {tasks.map((category) => {
            return (
              <div styles={styles.container}>
                <button onClick={() => setShowTasks(!showTasks)}>
                  <h1>{category.title}</h1>
                </button>
              </div>
            );
          })}
        </div>
      )} */}
    </div>
  );
};

export default AllCategories;
