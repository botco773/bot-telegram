/**
 * example scenes | https://github.com/telegraf/telegraf/issues/810#issuecomment-596155043
 * validation input | https://github.com/telegraf/telegraf/issues/392#issuecomment-389124023
 * get Callback query | https://github.com/telegraf/telegraf/issues/996#issue-604818209
 */
import { Scenes, Markup } from "telegraf";

import sholatModel from "../model/sholatModel.js";
const superWizard = new Scenes.WizardScene(
  "super-wizard",
  async (ctx) => {
    ctx.telegram.sendMessage(
      ctx.chat.id,
      "Silahkan masukkan nama kota/kabupaten anda",
      {
        reply_to_message_id: ctx.message.message_id,
      }
    );
    ctx.wizard.state.data = {};
    return ctx.wizard.next();
  },
  async (ctx) => {
    const text = ctx.message.text;
    let data = await sholatModel.get(`kota/cari/${text}`);

    if (text.length < 3) {
      ctx.telegram.sendMessage(
        ctx.chat.id,
        "Nama kota/kabupaten minimal 3 huruf",
        {
          reply_to_message_id: ctx.message.message_id,
        }
      );
      return ctx.reply("Nama kota/kabupaten minimal 3 huruf");
    } else {
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
      return ctx.scene.leave();
    }
  },
  (ctx) => {
    const text = ctx.message.text;
    if (/^\d+$/.test(text)) {
      ctx.wizard.state.data.phone = ctx.message.text;
      ctx.reply(`Your name is ${ctx.wizard.state.data.name}`);
      ctx.reply(`Your phone is ${ctx.wizard.state.data.phone}`);
      return ctx.scene.leave();
    } else {
      return ctx.reply("input only number");
    }
  }
);

export default superWizard;

