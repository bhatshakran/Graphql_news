import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});
