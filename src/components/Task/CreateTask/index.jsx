import Button from "../../buttons";
import Text from "../../text";
import styles from "./index.module.scss";

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
    <div className={styles.container}>
      <Text>Título</Text>
      <input
        className={styles.input}
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <Text> Categoria</Text>
      <input
        className={styles.input}
        type="text"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <Text>Comentários</Text>
      <input
        className={styles.input}
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
