require('dotenv').config();
const { Client } = require('discord.js');
const bot = new Client();
const { loadCommands, loadEvents } = require('./utils/functions');

bot.login(process.env.BOT_TOKEN);

(async () => {
    await loadCommands(bot);
    await loadEvents(bot);
});