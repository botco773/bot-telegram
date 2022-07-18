import { Scenes, session, Telegraf } from "telegraf";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

import userModel from "./model/userModel.js";
import superWizard from "./scenes/scenesSholat.js";
const stage = new Scenes.Stage([superWizard]);

const bot = new Telegraf(process.env.TOKEN_TELEGRAM);

bot.use(session());
bot.use(stage.middleware());

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

let formatHelp = [];
let user;
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

  bot.command(command.name, async (ctx) => {
    user = {
      user: ctx.from,
      history: ctx.message,
    };
    await userModel.createUser(user);
    if (command.name === "help") ctx.help = formatHelp;
    command.execute(ctx, bot);
  });
}

bot.launch();
