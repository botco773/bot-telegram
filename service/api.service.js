import fetch from "node-fetch";
const ApiService = {
  async get(param) {
    const base_url = process.env.URL_SHOLAT;
    try {
      const response = await fetch(base_url + param);
      return await response.json();
    } catch (error) {
      throw new Error(`ApiService ${error}`);
    }
  },
};

export default ApiService;

