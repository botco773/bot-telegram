module.exports = {
  commandHelp(command) {
    let formatHelp = [];

    let help = {
      name: command.name,
      description: command.description,
    };
    formatHelp.push(help);
    return formatHelp;
  },
};

