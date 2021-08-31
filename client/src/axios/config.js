import axios from "axios";

let instance = axios.create({
  baseURL: "/graphql",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
   
  },
 
  
});
axios.defaults.headers.common["Authorization"] =
"Bearer " + localStorage.getItem("X-AUTH");


export default instance

// axios.interceptors.request.use(function (config) {
//   const token = localStorage.getItem("X-AUTH");
//   config.headers.Authorization = token ? `Bearer ${token}` : "";
//   return config;
// });