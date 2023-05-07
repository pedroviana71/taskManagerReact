import { useState } from "react";
import { CirclePicker, ColorResult } from "react-color";
import { useCreateCategoryMutation } from "../../../app/api/tasksSlice";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [createCategory] = useCreateCategoryMutation();
  const navigate = useNavigate();

  const handleColor = (color: ColorResult) => {
    setColor(color.hex);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await createCategory({ name, color }).unwrap();
    navigate("/categories");
  };

  const handleInput = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setName(target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectionContainer}>
        <input
          onChange={handleInput}
          className={styles.input}
          placeholder="Escreva o nome da categoria ..."
        />
        <p className={styles.chooseColor}>Escolha uma cor</p>
        <CirclePicker color={color} onChangeComplete={handleColor} />
      </div>
      <button onClick={handleSubmit} className={styles.createCategory}>
        Criar categoria
      </button>
    </div>
  );
};

export default CreateCategory;
