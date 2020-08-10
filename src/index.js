require('dotenv').config();
const { Client, Collection } = require('discord.js');
const bot = new Client();
const { loadCommands, loadEvents } = require('./utils/functions');
const { connect } = require('mongoose');

connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

bot.login(process.env.BOT_TOKEN);

bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();

loadCommands(bot);
loadEvents(bot);