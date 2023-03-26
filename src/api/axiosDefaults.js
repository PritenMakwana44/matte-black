import axios from "axios";

// axios.defaults.baseURL = "https://mb-api-backend.herokuapp.com/";
axios.defaults.baseURL = "https://8000-pritenmakwana44-mbapi-1wfyi1f7ff3.ws-eu92.gitpod.io/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();