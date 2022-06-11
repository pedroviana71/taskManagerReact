import { useState } from "react";
import Button from "../buttons/Selection";

const Home = () => {
  const [show, setShow] = useState("toDo");
  return (
    <div>
      <div>
        <Button name={"teste"} />
        <button>Doing</button>
        <button>Done</button>
        <button>All</button>
      </div>
      <div>Tasks</div>
    </div>
  );
};

export default Home;
