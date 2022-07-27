import sholatModel from "../model/sholatModel.js";
import template from "../template/jadwalSholat.js";

export default {
  async inputLocation(ctx) {
    let message_id = ctx.callbackQuery
      ? ctx.callbackQuery.message.message_id
      : ctx.message.message_id;
    ctx.telegram.sendMessage(
      ctx.chat.id,
      "Silahkan masukkan nama kota/kabupaten anda",
      {
        reply_to_message_id: message_id,
      }
    );
    ctx.wizard.state.data = {};
  },
  async selectLocation(ctx) {
    const text = ctx.message.text;
    if (text.length < 3) {
      ctx.telegram.sendMessage(
        ctx.chat.id,
        "Nama kota/kabupaten minimal 3 huruf",
        {
          reply_to_message_id: ctx.message.message_id,
        }
      );
    } else {
      let data = await sholatModel.get(`kota/cari/${text}`);

      if (typeof data.status !== undefined && data.status === false) {
        return ctx.telegram.sendMessage(ctx.chat.id, data.message, {
          reply_to_message_id: ctx.message.message_id,
        });
      }

      var keyboard = [];
      data.map((valKotaKab) => {
        keyboard.push([
          {
            text: valKotaKab.lokasi,
            callback_data: JSON.stringify({
              id: valKotaKab.id,
              lokasi: valKotaKab.lokasi,
              type: "lokasi",
            }),
          },
        ]);
      });

      ctx.wizard.state.data.name = ctx.message.text;
      ctx.telegram.sendMessage(
        ctx.chat.id,
        "Silahkan pilih salah satu kota/kabupaten berikut",
        {
          reply_to_message_id: ctx.message.message_id,

          reply_markup: JSON.stringify({
            inline_keyboard: keyboard,
          }),
        }
      );
    }
  },
  async respJadwal(ctx) {
    const getId = JSON.parse(ctx.callbackQuery.data);
    const getTemplate = await template(getId.id);
    ctx.telegram.sendMessage(ctx.chat.id, `${getTemplate}`, {
      parse_mode: "html",
    });
  },
};
