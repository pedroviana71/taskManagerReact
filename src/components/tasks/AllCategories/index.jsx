import _ from "lodash";
import styles from "./index.module.scss";
import { useState } from "react";
import Category from "./Category";
import {
  useGetCategoriesQuery,
  useGetTaskCategoryMutation,
} from "../../../app/api/tasksSlice";
import { useEffect } from "react";

const AllCategories = ({ filtered }) => {
  const categoriesId = filtered?.map((task) => task.categoryId);
  const uniqueCategoriesId = _.uniq(categoriesId);
  const userId = localStorage.getItem("id");

  const { data: categories } = useGetCategoriesQuery(userId);
  const [getTask, result] = useGetTaskCategoryMutation();

  const handle = () => {
    setShowTasks(!showTasks);
    getTask(uniqueCategoriesId);
  };

  useEffect(() => {
    console.log(result);
  }, [result]);

  const [showTasks, setShowTasks] = useState(false);

  return (
    <div>
      {showTasks ? (
        <Category categoriesIds={uniqueCategoriesId} />
      ) : (
        <div>
          {categories?.map((category) => {
            return (
              <div styles={styles.container}>
                <button onClick={handle}>
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
