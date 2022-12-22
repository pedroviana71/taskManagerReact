import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksSlice = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005/api/",
    // credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      const userId = getState().user.id;

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
  }),
});

export const {
  useGetAllTasksQuery,
  useDeleteTaskMutation,
  useCreateTaskMutation,
  useEditTaskMutation,
} = tasksSlice;
