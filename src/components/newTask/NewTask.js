import Button from "../buttons";

const NewTask = ({ title, handleTitle, createTask }) => {
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

export default NewTask;
