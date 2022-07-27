export default {
  name: "setting",
  description: "Setting bot profile",
  execute(ctx) {
    ctx.scene.enter("setting-wizard");
  },
};
