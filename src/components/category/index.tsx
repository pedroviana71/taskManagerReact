import {
  Category as CategoryType,
  useCreateCategoryMutation,
  useGetCategoriesQuery,
} from "../../app/api/tasksSlice";
import { useEffect, useState } from "react";
import { CirclePicker, ColorResult } from "react-color";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { MdDelete, MdEdit } from "react-icons/md";

const Category = () => {
  const { data } = useGetCategoriesQuery();
  const [categories, setCategories] = useState<CategoryType[] | []>([]);
  //   const [name, setName] = useState("");
  //   const [color, setColor] = useState("");
  //   const [createCategory] = useCreateCategoryMutation();
  //   const navigate = useNavigate();

  //   const handleColor = (color: ColorResult) => {
  //     setColor(color.hex);
  //   };

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  //   const handleSubmit = async (e: React.SyntheticEvent) => {
  //     e.preventDefault();
  //     const category = await createCategory({ name, color }).unwrap();
  //     setName("");
  //     if (data) {
  //       setCategories([...data, category]);
  //     }
  //   };

  //   const handleGoBack = () => {
  //     navigate("/create-task");
  //   };

  return (
    <div className={styles.container}>
      {categories?.map((category) => (
        <div
          key={category?._id}
          className={styles.category}
          style={{ backgroundColor: `${category.color}66` }}
        >
          <h1>{category?.name}</h1>
          <div>
            <MdDelete />
            <MdEdit />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
