import { useState } from "react";
import { useGetTaskCategoryMutation } from "../../../../app/api/tasksSlice";
import { useEffect } from "react";

const Category = ({ categoriesIds }) => {
  // const [teste, setTeste] = useState();
  // const [getTask, result] = useGetTaskCategoryMutation();

  // useEffect(() => {
  //   getTask(categoriesIds);
  // }, [categoriesIds, getTask]);

  // console.log(result);

  return (
    <div>
      {/* {tasks.map((task) => {
        return <h1>{task.title}</h1>;
      })} */}
    </div>
  );
};

export default Category;
