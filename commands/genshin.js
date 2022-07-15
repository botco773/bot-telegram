export default {
  name: "genshin",
  description: "get picture genshin impact",
  execute(ctx, bot) {
    let animalMessage = `great, here are pictures of character you would love`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, animalMessage, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "klee",
              callback_data: "klee",
            },
            {
              text: "kazuhas",
              callback_data: "kazuha",
            },
          ],
        ],
      },
    });

    //method that returns image of a dog
    bot.action("klee", (ctx) => {
      bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/1650777491506.png",
      });
    });

    //method that returns image of a cat
    bot.action("kazuha", (ctx) => {
      bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/1650887000527.png",
      });
    });
  },
};

