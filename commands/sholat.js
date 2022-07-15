import * as service from "../service/api.service.js";
const ApiService = service.default;
export default {
  name: "sholat",
  description: "Get schedule shalat",
  execute: async (ctx, bot) => {
    await ApiService.get()
      .then(({ data }) => {
        bot.telegram.sendMessage(
          ctx.chat.id,
          "hello there! Welcome to my new telegram bot. \n" +
            JSON.stringify(data),
          {}
        );

        bot.telegram.sendLocation(
          ctx.chat.id,
          data.koordinat.lat,
          data.koordinat.lon
        );
      })
      .catch((error) => {
        console.info(error.message);
      });
  },
};

