import userModel from "../model/userModel.js";
import sholatModel from "../model/sholatModel.js";
export default {
  name: "sholat",
  description: "Get schedule shalat",
  execute: async (ctx, bot) => {
    // await bot.telegram.sendMessage(ctx.chat.id, "Tunggu Sebentar...", {});
    const detailUser = await userModel.detail(ctx.chat.id);
    if (detailUser.id_kota_kab) {
      let data = await sholatModel.get(
        `jadwal/${detailUser.id_kota_kab}/2022/01/14`
      );

      await bot.telegram.sendMessage(
        ctx.chat.id,
        "hello there! Welcome to my new telegram bot. \n" +
          JSON.stringify(data),
        {
          reply_to_message_id: ctx.message.message_id,
        }
      );

      await bot.telegram.sendLocation(
        ctx.chat.id,
        data.koordinat.lat,
        data.koordinat.lon
      );
    } else {
      ctx.scene.enter("super-wizard");
      bot.on("callback_query", async (ctx) => {
        const getId = JSON.parse(ctx.callbackQuery.data);
        const getMessageId = ctx.callbackQuery.message;

        let dataQuran = await sholatModel.get(`jadwal/${getId.id}/2022/01/14`);

        let koordinat = Object.entries(dataQuran.koordinat)
          .map(([key, val] = entry) => `${key} : ${val}\n`)
          .join("");

        let jadwal = Object.entries(dataQuran.jadwal)
          .map(([key, val] = entry) => `${key} : ${val}\n`)
          .join("");

        bot.telegram.sendMessage(ctx.chat.id, `${koordinat}${jadwal}`, {
          reply_to_message_id: getMessageId.message_id,
        });
      });
    }
  },
};

