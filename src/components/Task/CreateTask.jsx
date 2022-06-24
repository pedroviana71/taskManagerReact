import Button from "../buttons";
import Text from "../text";

const CreateTask = ({
  title,
  setTitle,
  comments,
  setComments,
  category,
  setCategory,
  handleSubmit,
}) => {
  const handleClick = () => {
    handleSubmit();
    setTitle("");
    setComments("");
    setCategory("");
  };
  return (
    <div>
      <Text>Título</Text>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <Text> Categoria</Text>
      <input
        type="text"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <Text>Comentários</Text>
      <input
        type="text"
        value={comments}
        onChange={(e) => {
          setComments(e.target.value);
        }}
      />

      <Button onClick={handleClick}>Adicionar</Button>
    </div>
  );
};

export default CreateTask;
