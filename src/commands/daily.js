const userConfig = require('../../models/UserConfig');
const { findUser, giveCoins } = require('../utils/currencyFunctions');
const { MessageEmbed } = require('discord.js');
const prettyMilliseconds = require('pretty-ms');

module.exports.run = async (bot, message, args) => {
    let data = await findUser(message.author.id, message.guild.id);

    const now = Date.now();

    if (!data) return;

    if ((now - data.daily) + Date.now() < Date.now() + 1) {
        const underTime = new MessageEmbed()
        .setTitle('Cooldown')
        .setDescription(`This command is on a cooldown, try again in \`${prettyMilliseconds(86400000 - ((now - data.daily) + 86400000))}\`.\n\nThe default cooldown on this command is \`24h\`.`)
        .setColor(0x3c54b4);
        return message.channel.send(underTime);
    } else if ((now - data.daily) + Date.now() > Date.now() + 1) {
        const overTime = new MessageEmbed()
        .setTitle('1000 Coins were placed in your Wallet')
        .setDescription('Come back in 24 hours to claim another 1000 coins!')
        .setColor('RANDOM');
        message.channel.send(overTime);
        giveCoins(message.author.id, message.guild.id, 1000);
        data.daily = (Date.now() + 86400000);

        await data.save();
    }
}

module.exports.config = {
    name: "daily",
    description: "Claim your daily reward!",
    usage: "eco daily",
    accessableby: "Public Access",
    aliases: [],
    cooldown: 0.1
}