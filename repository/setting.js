import sholatModel from "../model/sholatModel.js";
import userModel from "../model/userModel.js";
export default {
  async listMenuSetting(ctx) {
    var keyboard = [];
    var settingMenu = [{ id: 1, label: "Lokasi" }];
    settingMenu.map((menu) => {
      keyboard.push([
        {
          text: menu.label,
          callback_data: JSON.stringify({
            id: menu.id,
            label: menu.label,
            type: "listMenu",
          }),
        },
      ]);
    });
    ctx.telegram.sendMessage(ctx.chat.id, "Apa yang ingin kamu ubah?", {
      reply_to_message_id: ctx.message.message_id,

      reply_markup: JSON.stringify({
        inline_keyboard: keyboard,
      }),
    });
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
  async updateLokasi(ctx) {
    let location = JSON.parse(ctx.callbackQuery.data);
    delete location.type;

    let user = {
      user: ctx.from,
      location: location,
    };
    await userModel.update(user);
    ctx.telegram.sendMessage(ctx.chat.id, "Update lokasi berhasil");
  },
};
