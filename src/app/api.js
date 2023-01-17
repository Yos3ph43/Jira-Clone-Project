import axios from "axios";

const requestor = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    TokenCybersoft: process.env.REACT_APP_CYBERSOFT_TOKEN,
  },
});

requestor.interceptors.request.use((req) => {
  req.headers = {
    ...req.headers,
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  return req;
});

export default requestor;
