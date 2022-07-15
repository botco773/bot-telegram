const model = await import("../model/user.js");
const crud = model.default;
export default {
  name: "start",
  description: "Greeting text",
  async execute(ctx, bot) {
    await crud.insert(ctx.chat);
    return bot.telegram.sendMessage(
      ctx.chat.id,
      `hello there! Welcome to my new telegram bot. \nuse /help for list all command`,
      {}
    );
  },
};

