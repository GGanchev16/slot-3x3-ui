import http from "./http";

const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/slot`;

const play = async (bet: number) => {
  const response = await http.post(`${API_ENDPOINT}/play`, { bet });
  return response.data;
};

const sim = async (count: number, bet: number) => {
  const response = await http.post(`${API_ENDPOINT}/sim`, { count, bet });
  return response.data;
};

export default { play, sim };
