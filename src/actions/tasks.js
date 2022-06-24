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

export const createTask = async (title, category, comments) => {
  try {
    await api.post("api/tasks", {
      title,
      category,
      comments,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editTask = (id, title, comments, category, completed) => {
  return api
    .patch(`api/tasks/${id}`, {
      title,
      comments,
      category,
      completed,
    })
    .catch((err) => console.log(err));
};
