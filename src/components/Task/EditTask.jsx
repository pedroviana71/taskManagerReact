import Button from "../buttons";

const EditTask = ({ title, onChange, onClick, id }) => {
  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <Button onClick={onClick}>Editar</Button>
    </div>
  );
};

export default EditTask;
