import { useState } from "react";
import { CirclePicker, ColorResult } from "react-color";
import { useCreateCategoryMutation } from "../../../app/api/tasksSlice";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [createCategory] = useCreateCategoryMutation();

  const handleColor = (color: ColorResult) => {
    setColor(color.hex);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await createCategory({ name, color }).unwrap();
  };

  const handleInput = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
