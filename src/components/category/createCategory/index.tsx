import { useState } from "react";
import { CirclePicker, ColorResult } from "react-color";
import { useCreateCategoryMutation } from "../../../app/api/tasksSlice";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [createCategory] = useCreateCategoryMutation();
  const navigate = useNavigate();

  const handleColor = (color: ColorResult) => {
    setColor(color.hex);
    setShowAlert(false);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    if (!name || !color) {
      setShowAlert(true);
    }
    e.preventDefault();
    await createCategory({ name, color }).unwrap();
    navigate("/categories");
  };

  const handleInput = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setName(target.value);
    setShowAlert(false);
  };

  return (
    <form className={styles.container}>
      <div className={styles.selectionContainer}>
        {showAlert && (
          <p className={styles.alert}>É preciso selecionar um nome e uma cor</p>
        )}
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
    </form>
  );
};

export default CreateCategory;
