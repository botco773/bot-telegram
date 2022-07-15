import fetch from "node-fetch";
export default {
  async get() {
    try {
      const response = await fetch(
        "https://api.myquran.com/v1/sholat/jadwal/1404/2022/01/14"
      );
      return await response.json();
    } catch (error) {
      throw new Error(`ApiService ${error}`);
    }
  },
};

