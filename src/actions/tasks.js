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
    })
    .catch((err) => console.log(err));
};

export const createTask = (title) => {
  return api
    .post("api/tasks", {
      title,
    })
    .then(({ data }) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
};
