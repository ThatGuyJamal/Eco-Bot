const userConfig = require('../../models/UserConfig');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let users = await userConfig.find({ guildId: message.guild.id }).sort([['coins', 'descending']]).exec();

    const rich = users.slice(0, 5);

    if (rich.length < 1) return;

    const array = [];

    rich.map(key => array.push({
        userId: key.userId,
        coins: key.coins,
        username: bot.users.cache.get(key.userId).username ? bot.users.cache.get(key.userId).username : "Nobody",
        discriminator: bot.users.cache.get(key.userId).discriminator ? bot.users.cache.get(key.userId).discriminator : "#0000"
    }));

    const mappedArray = array.map(e => `**${e.coins.toLocaleString()}** - ${e.username}#${e.discriminator}`);

    const embed = new MessageEmbed()
    .setAuthor(`Richest Users in ${message.guild.name}`)
    .setDescription(`${mappedArray.join('\n')}`)
    .setFooter('Epic')
    .setColor('RANDOM');
    message.channel.send(embed);
}

module.exports.config = {
    name: "rich",
    description: "Shows the richest people in your server.",
    usage: "eco rich",
    accessableby: "Public Access",
    aliases: [],
    cooldown: 5
}