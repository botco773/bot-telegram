/**
 * example scenes | https://github.com/telegraf/telegraf/issues/810#issuecomment-596155043
 * validation input | https://github.com/telegraf/telegraf/issues/392#issuecomment-389124023
 * get Callback query | https://github.com/telegraf/telegraf/issues/996#issue-604818209
 */
import { Scenes, Markup } from "telegraf";

import searchLocation from "../repository/searchLocation.js";
const superWizard = new Scenes.WizardScene(
  "super-wizard",
  async (ctx) => {
    await searchLocation.inputLocation(ctx);
    return ctx.wizard.next();
  },
  async (ctx) => {
    await searchLocation.selectLocation(ctx);
    return ctx.wizard.next();
  },
  async (ctx) => {
    ctx.answerCbQuery();
    await searchLocation.respJadwal(ctx);
    return ctx.scene.leave();
  }
);

export default superWizard;
