const { Telegraf } = require("telegraf");
require("dotenv").config();
const fs = require("fs");
const bot = new Telegraf(process.env.TOKEN_TELEGRAM);
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.command(command.name, (ctx) => {
    if (command.name === "start") ctx.help = commandFiles;
    command.execute(ctx, bot);
  });
}

bot.launch();
