const { findUser } = require('../utils/currencyFunctions');

module.exports.run = async (bot, message, args) => {
    let data = await findUser(message.author.id);

    if (!data) return;

    if (args.join(' ') === 'all') {
        if (data.coins > data.bankSpace) {
            data.coins = (data.coins - (data.bankSpace - data.coinsInBank));

            await message.channel.send(`Deposited **${(data.bankSpace - data.coinsInBank)}** coins.`);

            data.coinsInBank += (data.bankSpace - data.coinsInBank);

            await data.save();
        } else {
            data.coinsInBank += data.coins;

            await message.channel.send(`Deposited **${data.coins}** coins.`);

            data.coins -= data.coins;

            await data.save();
        }
    } else {
        if (isNaN(args[0])) {
            return message.channel.send('That\'s not a number.');
        }

        if (parseInt(args[0]) > data.bankSpace) {
            return message.channel.send('Your bank is not big enough.');
        }

        data.coinsInBank += parseInt(args[0]);

        await message.channel.send(`Deposited **${args[0]}** coins.`);

        data.coins -= parseInt(args[0]);

        await data.save();
    }
}

module.exports.config = {
    name: "deposit",
    description: "Deposits coins.",
    usage: "eco deposit <all | amount>",
    accessableby: "Public Access",
    aliases: ['dep'],
    cooldown: 10
}