"use strict";

const env = require("dotenv").config();
const tmi = require("tmi.js");

const commands = require("./commands");

const client = tmi.Client({
  identity: {
    username: env.parsed.USERNAME,
    password: env.parsed.OAUTH_TOKEN
  },
  channels: env.parsed.CHANNEL ? [env.parsed.CHANNEL] : []
});

client
  .connect()
  .then(() => {
    client.on("chat", (channel, context, message, self) => {
      if (self || message[0] != "!") return;

      const value = message.replace("!", "").trim();
      const command = commands(context).find(command => command.key == value);

      if (!command) return;

      client.say(channel, command.say);
    });

    client.on("subscription", (channel, username) => {
      client.say(
        channel,
        `@${username} ${env.parsed.MESSAGE_SUFFIX_SUBSCRIPTION}`
      );
    });
  })
  .catch(() => {
    console.log("Unable to connect to Twitch.");
  });
