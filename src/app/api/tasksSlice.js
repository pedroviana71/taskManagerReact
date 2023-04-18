import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksSlice = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://colorful-hare-zipper.cyclic.app/api",
    // credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token || localStorage.getItem("token");
      const userId = getState().user.id || localStorage.getItem("id");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      if (userId) {
        headers.set("id", userId);
      }

      return headers;
    },
  }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => ({
        url: "tasks",
        method: "GET",
      }),
      providesTags: ["Tasks"],
    }),
    getTask: builder.query({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "GET",
      }),
      providesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    editTask: builder.mutation({
      query: (task) => ({
        url: `tasks/${task.id}`,
        method: "PATCH",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    getUser: builder.query({
      query: () => ({
        url: "auth/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getCategories: builder.query({
      query: () => ({
        url: "category",
        method: "GET",
      }),
    }),
    createCategory: builder.mutation({
      query: (category) => ({
        url: "category",
        method: "POST",
        body: category,
      }),
    }),
    getTaskCategory: builder.mutation({
      query: (id) => ({
        url: "tasks/category",
        method: "POST",
        body: { id },
      }),
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
  useGetTaskCategoryMutation,
} = tasksSlice;
