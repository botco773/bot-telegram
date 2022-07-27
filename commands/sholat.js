import userModel from "../model/userModel.js";
import template from "../template/jadwalSholat.js";

export default {
  name: "sholat",
  description: "Get schedule shalat",
  execute: async (ctx, bot) => {
    // await bot.telegram.sendMessage(ctx.chat.id, "Tunggu Sebentar...", {});
    const detailUser = await userModel.detail(ctx.chat.id);
    const getTemplate = await template(detailUser.location.id);

    bot.telegram.sendMessage(ctx.chat.id, `${getTemplate}`, {
      reply_to_message_id: ctx.message_id,
      parse_mode: "html",
    });
  },
};
