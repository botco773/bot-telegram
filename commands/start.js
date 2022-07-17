export default {
  name: "start",
  description: "Greeting text",
  async execute(ctx, bot) {
    return bot.telegram.sendMessage(
      ctx.chat.id,
      `hello there! Welcome to my new telegram bot. \nuse /help for list all command`,
      {}
    );
  },
};

