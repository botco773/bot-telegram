module.exports = {
  name: "start",
  description: "Greeting text",
  execute(ctx, bot) {
    let help = ctx.help
      .map((data) => {
        let nameFile = data.split(".");
        let nameCommands = `/${nameFile[0]}\n`;
        return nameCommands;
      })
      .join("");
    return bot.telegram.sendMessage(
      ctx.chat.id,
      "hello there! Welcome to my new telegram bot. \n" + help,
      {}
    );
  },
};

