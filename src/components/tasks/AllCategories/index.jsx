import _ from "lodash";
import styles from "./index.module.scss";

const AllCategories = ({ filtered }) => {
  const categories = _.uniqBy(filtered, (task) => task.categoryId);

  console.log(categories);

  return (
    <div>
      {categories.map((category) => {
        return (
          <div styles={styles.container}>
            <h1>{category.title}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default AllCategories;
