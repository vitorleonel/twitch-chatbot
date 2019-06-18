const path = require("path");

const commands = require("dotenv").config({
  path: path.resolve(__dirname, "..", ".commands")
});

const replaceVariables = ({ username }, message) => {
  if (message.includes("{username}"))
    message = message.replace("{username}", username);

  return message;
};

module.exports = context => {
  if (commands.error) return [];

  return Object.keys(commands.parsed).map(command => {
    let message = replaceVariables(context, commands.parsed[command]);

    return { key: command.toLocaleLowerCase(), say: message };
  });
};
