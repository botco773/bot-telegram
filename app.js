import http from "http";
import { Scenes, session, Telegraf } from "telegraf";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { readFile } from "./helper/fileSystem.js";

import userModel from "./model/userModel.js";
import superWizard from "./scenes/scenesSholat.js";
import { settingWizard, locationWizard } from "./scenes/scenesSetting.js";
const stage = new Scenes.Stage([superWizard, settingWizard, locationWizard]);

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
   * @link https://stackovereadFilelow.com/a/55049040/9446622
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

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

const requestListener = function (req, res) {
  try {
    let contents = readFile("view/index.html");
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(contents);
  } catch (error) {
    res.setHeader("Content-Type", "text/plain");
    res.end(error.message);
  }
};

const server = http.createServer(requestListener);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
