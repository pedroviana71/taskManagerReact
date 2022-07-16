import Button from "../../buttons";
import Text from "../../text";

const EditTask = ({
  title,
  setTitle,
  comments,
  setComments,
  category,
  setCategory,
  onClick,
  setShowEditField,
}) => {
  return (
    <div>
      <Text>Titulo</Text>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Text>Categoria</Text>
      <input
        type="text"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      <Text>Comentarios</Text>
      <input
        type="text"
        value={comments}
        onChange={(e) => {
          setComments(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          onClick();
          setShowEditField();
        }}
      >
        Editar
      </Button>
    </div>
  );
};

export default EditTask;
