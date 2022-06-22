import Button from "../buttons";

const CreateTask = ({ title, onChange, handleSubmit }) => {
  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <Button onClick={handleSubmit}>Adicionar</Button>
    </div>
  );
};

export default CreateTask;
