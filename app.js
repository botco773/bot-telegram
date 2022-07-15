import { Telegraf } from "telegraf";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
const bot = new Telegraf(process.env.TOKEN_TELEGRAM);
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

let formatHelp = [];
for (const file of commandFiles) {
  /**
   * @link https://stackoverflow.com/a/55049040/9446622
   */
  const importCommand = await import(`./commands/${file}`);
  const command = importCommand.default;

  let help = {
    name: command.name,
    description: command.description,
  };
  formatHelp.push(help);

  bot.command(command.name, (ctx) => {
    if (command.name === "help") ctx.help = formatHelp;
    command.execute(ctx, bot);
  });
}

bot.launch();
