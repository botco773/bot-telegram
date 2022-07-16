import ApiService from "../service/api.service.js";
const sholatModel = {
  async get(param) {
    let response;
    await ApiService.get(param)
      .then(async (data) => {
        if (data.status) {
          response = data.data;
        } else {
          if (data.message) {
            /**
             * /kota/cari/jakartafdsfsdf
             * when searching not have result
             */

            response = data.message;
          } else {
            // /kota/semua
            response = data;
          }
          response = data;
        }
      })
      .catch((error) => {
        response = error;
      });
    return response;
  },
};

export default sholatModel;

