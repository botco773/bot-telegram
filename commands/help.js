export default {
  name: "help",
  description: "Show all command",
  execute(ctx, bot) {
    let help = ctx.help
      .map((data) => {
        return `/${data.name}: ${data.description} \n`;
      })
      .join("");
    return bot.telegram.sendMessage(
      ctx.chat.id,
      "This is all command in bot. \n" + help,
      {}
    );
  },
};

