import { useState } from "react";
import { CirclePicker, ColorResult } from "react-color";
import { useCreateCategoryMutation } from "../../../app/api/tasksSlice";
import { useNavigate } from "react-router-dom";

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
    <div>
      <input onChange={handleInput} />
      <CirclePicker color={color} onChangeComplete={handleColor} />
      <button onClick={handleSubmit}>Criar categoria</button>
    </div>
  );
};

export default CreateCategory;
