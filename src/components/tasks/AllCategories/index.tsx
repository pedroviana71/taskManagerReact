import styles from "./index.module.scss";
import { useState } from "react";
import Category from "./Category";
import { useGetCategoriesQuery } from "../../../app/api/tasksSlice";

const AllCategories = () => {
  const [id, setId] = useState("");

  const { data: categories } = useGetCategoriesQuery();

  const handle = (id: string) => {
    setId(id);
    setShowTasks(!showTasks);
  };

  const [showTasks, setShowTasks] = useState(false);

  return (
    <div>
      {showTasks ? (
        <Category id={id} />
      ) : (
        <div>
          {categories?.map((category) => {
            return (
              <div className={styles.container} key={category._id}>
                <button onClick={() => handle(category._id)}>
                  <h1>{category.name}</h1>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllCategories;
