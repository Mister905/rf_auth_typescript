import { interceptor_config } from "./interceptors";
import axios from "axios";


const instance = interceptor_config(axios.create({ baseURL: "http://localhost:3000/api" }));

export default instance;