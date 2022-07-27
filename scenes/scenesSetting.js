import { Scenes, Markup } from "telegraf";
import searchLocation from "../repository/searchLocation.js";
import setting from "../repository/setting.js";

export const settingWizard = new Scenes.WizardScene(
  "setting-wizard",
  async (ctx) => {
    await setting.listMenuSetting(ctx);
    return ctx.wizard.next();
  },
  async (ctx) => {
    ctx.answerCbQuery();
    const getCb = JSON.parse(ctx.callbackQuery.data);
    if (getCb.label.toLowerCase() === "lokasi") {
      await searchLocation.inputLocation(ctx);
    }
    return ctx.wizard.next();
  },
  async (ctx) => {
    await searchLocation.selectLocation(ctx);
    return ctx.wizard.next();
  },
  async (ctx) => {
    ctx.answerCbQuery();
    await setting.updateLokasi(ctx);
    return ctx.scene.leave();
  }
);

export const locationWizard = new Scenes.WizardScene(
  "location-wizard",
  async (ctx) => {
    await searchLocation.inputLocation(ctx);
  },
  async (ctx) => {
    await searchLocation.selectLocation(ctx);
  }
);
