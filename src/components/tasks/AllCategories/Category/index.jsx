import { useGetAllTasksQuery } from "../../../../app/api/tasksSlice";
import AllTasks from "../../AllTasks";

const Category = ({ id }) => {
  const { data } = useGetAllTasksQuery();

  const tasks = data?.filter((task) => {
    return task.categoryId === id;
  });

  return (
    <div>
      <AllTasks filtered={tasks} title={"caegoria"} />
    </div>
  );
};

export default Category;
