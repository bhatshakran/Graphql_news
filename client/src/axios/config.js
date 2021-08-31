import axios from "axios";

export default axios.create({
  baseURL: "/graphql",
  method: "POST",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("X-AUTH"),
    "Content-Type": "application/json",
  },
});
