import Button from "../buttons";

const Task = ({ title, handleTitle, createTask }) => {
  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          handleTitle(e.target.value);
        }}
      />
      <Button onClick={createTask}>Adicionar</Button>
    </div>
  );
};

export default Task;
