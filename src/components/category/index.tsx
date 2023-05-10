import {
  Category as CategoryType,
  useGetCategoriesQuery,
} from "../../app/api/tasksSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";

const Category = () => {
  const { data } = useGetCategoriesQuery();
  const [categories, setCategories] = useState<CategoryType[] | []>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const handleAddCategory = () => {
    navigate("/create-category", {
      state: { previousPath: "/create-category" },
    });
  };

  return (
    <div className={styles.container}>
      {categories.length > 0 ? (
        categories.map((category) => (
          <div
            key={category?._id}
            className={styles.category}
            style={{ backgroundColor: `${category.color}66` }}
          >
            <h1 className={styles.categoryTitle}>{category?.name}</h1>
            <div className={styles.icons}>
              <MdEdit />
              <MdDelete />
            </div>
          </div>
        ))
      ) : (
        <p className={styles.warningAddCategory}>
          Clique em + para adicionar uma categoria
        </p>
      )}
      <div className={styles.addCategory} onClick={handleAddCategory}>
        <MdAdd />
      </div>
    </div>
  );
};

export default Category;
