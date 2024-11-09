import axios from "axios";

axios.interceptors.request.use((config) => {
  return config;
});

const exportedFunctions = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default exportedFunctions;
