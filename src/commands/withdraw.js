const { findUser } = require('../utils/currencyFunctions');

module.exports.run = async (bot, message, args) => {
    let data = await findUser(message.author.id);

    if (!data) return;

    if (args.join(' ') === 'all') {
        data.coins += data.coinsInBank;

        await message.channel.send(`Withdrawed **${data.coinsInBank}** coins.`);

        data.coinsInBank -= data.coinsInBank;

        await data.save();
    } else {
        if (isNaN(args[0])) {
            return message.channel.send('That\'s not a number.');
        }

        if (parseInt(args[0]) > data.coinsInBank) {
            return message.channel.send('You do not have that much coins.');
        }

        data.coins += parseInt(args[0]);

        await message.channel.send(`Withdrawed **${args[0]}** coins.`);

        data.coinsInBank -= parseInt(args[0]);

        await data.save();
    }
}

module.exports.config = {
    name: "withdraw",
    description: "Withdraws money from your bank.",
    usage: "eco withdraw <all | amount>",
    accessableby: "Public Access",
    aliases: ['with'],
    cooldown: 10
}