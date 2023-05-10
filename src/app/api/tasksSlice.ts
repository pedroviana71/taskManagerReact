import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export interface Task {
  _id: string;
  title: string;
  completed: boolean;
  categoryId: string;
  comments: string;
  deadline: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Category {
  _id: string;
  name: string;
  color: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const tasksSlice = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://colorful-hare-zipper.cyclic.app/api",
    baseUrl: "http://localhost:3005/api",
    // credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as RootState).user.token || localStorage.getItem("token");
      const userId =
        (getState() as RootState).user.id || localStorage.getItem("id");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      if (userId) {
        headers.set("id", userId);
      }

      return headers;
    },
  }),
  tagTypes: ["Tasks", "Categories"],
  endpoints: (builder) => ({
    getAllTasks: builder.query<Task[], void>({
      query: () => ({
        url: "tasks",
        method: "GET",
      }),
      providesTags: ["Tasks"],
    }),
    getTask: builder.query<Task, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "GET",
      }),
    }),
    deleteTask: builder.mutation<null, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    createTask: builder.mutation<null, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    editTask: builder.mutation<null, Partial<Task>>({
      query: (task) => ({
        url: `tasks/${task._id}`,
        method: "PATCH",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    getUser: builder.query<User, void>({
      query: () => ({
        url: "auth/user",
        method: "GET",
      }),
    }),
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "category",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation<Category, Partial<Category>>({
      query: (category) => ({
        url: "category",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    editCategory: builder.mutation<Category, Partial<Category>>({
      query: (category) => ({
        url: `category/${category._id}`,
        method: "PATCH",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation<null, string>({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useDeleteTaskMutation,
  useCreateTaskMutation,
  useEditTaskMutation,
  useGetTaskQuery,
  useGetUserQuery,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = tasksSlice;
