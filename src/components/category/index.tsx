import {
  Category as CategoryType,
  useDeleteCategoryMutation,
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
  const [deleteCategory] = useDeleteCategoryMutation();

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const handleAddCategory = () => {
    navigate("/create-category");
  };

  const handleEditCategory = (name: string, color: string) => {
    navigate(`/create-category/`, {
      state: {
        name,
        color,
      },
    });
  };

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
  };

  //! FIX EDIT CATEGORY
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
              {/* <MdEdit
                onClick={() =>
                  handleEditCategory(category.name, category.color)
                }
              /> */}
              <MdDelete onClick={() => handleDelete(category._id)} />
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
