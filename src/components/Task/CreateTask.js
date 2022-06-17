import Button from "../buttons";

const CreateTask = ({ title, onChange, onClick }) => {
  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <Button onClick={onClick}>Adicionar</Button>
    </div>
  );
};

export default CreateTask;
