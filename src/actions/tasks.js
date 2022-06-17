import { api } from "./api";

export const getTasks = async () => {
  try {
    const resp = await api.get("api/tasks").then(({ data }) => {
      return data;
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = (e) => {
  const { id } = e.target;
  return api
    .delete(`api/tasks/${id}`)
    .then(({ data }) => {
      console.log(data);
      // getTask();
    })
    .catch((err) => console.log(err));
};
