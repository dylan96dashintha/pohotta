import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL || 'https://pohatta.app';
const apiVer = process.env.REACT_APP_API_VERSION || '/api/v1';

const instance = axios.create({
  baseURL: baseUrl + apiVer
  // headers: { crossdomain: true }
});

// instance.defaults.headers.common["Authorization"] = "Auth token instance...";

export default instance;
