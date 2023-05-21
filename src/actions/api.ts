import axios from "axios";

export const api = axios.create({
  // baseURL: "https://newtaskmanagerapi.herokuapp.com/",
  baseURL: "http://localhost:3005/",
});
