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
      // bot.action("updateLocate", (ctx) => {
      //   console.log(ctx.chat.id);
      // });
      bot.on("callback_query", function (data) {
        console.log(data.data);
      });
      // bot.telegram.sendMessage(
      //   ctx.chat.id,
      //   // "Anda belum terdaftar. panggil /start untuk mendaftar.",
      //   "Silahkan cari lokasi berdasarkan nama kota/kabupaten",
      //   {
      //     reply_to_message_id: ctx.message.message_id,
      //   }
      // );

      // console.log(ctx.message);
      // console.log(ctx.chat);
      if (ctx.message.text === detailUser.history.text) {
        let data = await sholatModel.get(`kota/cari/${ctx.message.text}`);
        // console.log(data);
        // console.log(ctx.message.text);
        // bot.hears("phone", (ctx, next) => {
        //   bot.telegram.sendMessage(
        //     ctx.chat.id,
        //     "Can we get access to your phone number?",
        //     requestPhoneKeyboard
        //   );
        // });
        // const requestPhoneKeyboard = {
        //   reply_markup: {
        //     one_time_keyboard: true,
        //     keyboard: [
        //       [
        //         {
        //           text: "My phone number",
        //           request_contact: true,
        //           one_time_keyboard: true,
        //         },
        //       ],
        //       ["Cancel"],
        //     ],
        //   },
        // };
      }
      // console.log(ctx.message);

      // let data = await sholatModel.get("kota/cari/jakarta");
      // console.log(data);
      // let data = await sholatModel.get("kota/semua");
      // console.log(data);
    }
  },
};

