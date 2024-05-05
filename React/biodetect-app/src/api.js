import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    crossdomain: true,
});

export default api;