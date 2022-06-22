import { api } from "./api";

export const getTasks = async () => {
  try {
    const { data } = await api.get("api/tasks");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id) => {
  try {
    await api.delete(`api/tasks/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const createTask = async (title) => {
  try {
    await api.post("api/tasks", {
      title,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editTask = (id, title) => {
  console.log(id, title);
  return api
    .patch(`api/tasks/${id}`, {
      title,
    })
    .catch((err) => console.log(err));
};
