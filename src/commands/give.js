const { findUser } = require('../utils/currencyFunctions');

module.exports.run = async (bot, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args.join(' ') || member.user.username === args[0]);

    const amount = args[1];

    if (!member) {
        return message.channel.send('Please provide a user.');
    }

    if (member.id === message.author.id) {
        return message.channel.send('You can\'t give coins to yourself!');
    }

    if (!amount) {
        return message.channel.send('Please provide an amount.');
    }

    if (isNaN(amount)) {
        return message.channel.send('The amount must be a number');
    }

    let sender = await findUser(message.author.id, message.guild.id);
    let reciever = await findUser(member.id, member.guild.id);

    if (parseInt(amount) > sender.coins) {
        return message.channel.send("You don't have that many coins!");
    }

    sender.coins -= parseInt(amount);

    await message.channel.send(`${message.member} gave ${member} **${parseInt(amount).toLocaleString()}** coins.`);

    reciever.coins += parseInt(amount);

    await sender.save();
    await reciever.save();
}

module.exports.config = {
    name: "give",
    description: "Give coins to another user.",
    usage: "eco give <user> <amount>",
    accessableby: "Public Access",
    aliases: [],
    cooldown: 10
}