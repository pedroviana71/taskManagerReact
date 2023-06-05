import { useEffect, useState } from "react";
import { CirclePicker, ColorResult } from "react-color";
import { useCreateCategoryMutation } from "../../../app/api/tasksSlice";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import InlineAlert from "../../custom/inlineAlert";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [createCategory] = useCreateCategoryMutation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state?.name && location.state?.color) {
      setName(location.state.name);
      setColor(location.state.color);
    }
  }, [location]);

  const handleColor = (color: ColorResult) => {
    setColor(color.hex);
    setShowAlert(false);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    if (!name || !color) {
      setShowAlert(true);
    } else {
      e.preventDefault();
      await createCategory({ name, color }).unwrap();
      if (
        location.state &&
        location.state.previousPath === "/create-category"
      ) {
        navigate("/create-task");
      } else {
        navigate("/categories");
      }
    }
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
          <InlineAlert text="É preciso selecionar um nome e uma cor" />
        )}
        <input
          value={name || ""}
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
