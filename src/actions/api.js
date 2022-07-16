const axios = require("axios");

export const api = axios.create({
  baseURL: "https://newtaskmanagerapi.herokuapp.com/",
  // baseURL: "http://localhost:3005/",
});
