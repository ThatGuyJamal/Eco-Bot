const { findUser } = require('../utils/currencyFunctions');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args.join(' ')) || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(' ') || member.user.username === args.join(' ')) || message.member;

    let data = await findUser(member.id, member.guild.id);

    if (!data) return;

    const embed = new MessageEmbed()
    .setTitle(`${member.user.username}'s Balance`)
    .setDescription(`**Wallet**: ${data.coins.toLocaleString()}\n **Bank**: ${data.coinsInBank.toLocaleString()}/${data.bankSpace.toLocaleString()}\n**Total**: ${(data.coins + data.coinsInBank).toLocaleString()}`)
    .setColor('RANDOM');
    message.channel.send(embed);
}

module.exports.config = {
    name: "balance",
    description: "Checks your balance.",
    usage: "eco balance <user>",
    accessableby: "Public Access",
    aliases: ['bal'],
    cooldown: 3
}