import userModel from "../model/userModel.js";
export default {
  name: "start",
  description: "Greeting text",
  async execute(ctx, bot) {
    await userModel.insert(ctx.chat);
    return bot.telegram.sendMessage(
      ctx.chat.id,
      `hello there! Welcome to my new telegram bot. \nuse /help for list all command`,
      {}
    );
  },
};

