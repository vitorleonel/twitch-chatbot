"use strict";

const env = require("dotenv").config();
const tmi = require("tmi.js");

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
    client.on("join", (channel, username, self) => {
      if (self) return;

      client.say(channel, `@${username} ${env.parsed.MESSAGE_SUFFIX_JOIN}`);
    });

    client.on("chat", (channel, _, message, self) => {
      if (self || message[0] != "!") return;

      // implement commands
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
