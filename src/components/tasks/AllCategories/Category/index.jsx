const Category = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => {
        return <h1>{task.title}</h1>;
      })}
    </div>
  );
};

export default Category;
