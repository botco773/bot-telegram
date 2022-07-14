const axios = require("axios").default;
module.exports = {
  async get() {
    try {
      return await axios.get(
        "https://api.myquran.com/v1/sholat/jadwal/1404/2022/01/14"
      );
    } catch (error) {
      throw new Error(`ApiService ${error}`);
    }
  },
};

