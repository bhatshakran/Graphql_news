import axios from "axios";

export default axios.create({
  baseURL: "/graphql",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});
