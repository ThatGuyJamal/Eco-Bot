const { giveCoins, findUser } = require('../utils/currencyFunctions');

module.exports.run = async (bot, message, args) => {
    let data = await findUser(message.author.id, message.guild.id);

    if (!data) return;

    const people = [
        'Hamidreza Dashtipour',
        'Poryafm12',
        'Gavin',
        'Elon Musk',
        'ur mom',
        'your stepsister',
        'Proxy',
        'Onyx',
        'Hcgx3'
    ];

    const randomPeople = people[(Math.floor(Math.random() * people.length))];

    const randomNumber = Math.round(Math.random() * 400);

    await giveCoins(message.author.id, message.guild.id, randomNumber);

    const response = [
        `**${randomPeople}** finally gave ${message.member} **${randomNumber}** coins.`,
        `**${randomPeople}** gave ${message.member} **${randomNumber}** coins.`,
        `**${randomPeople}** threw **${randomNumber}** coins at ${message.member}.`
    ];

    const lastResponse = response[(Math.floor(Math.random() * response.length))];

    message.channel.send(`${lastResponse}`);
}

module.exports.config = {
    name: "beg",
    description: "Beg for some money.",
    usage: "eco beg",
    accessableby: "Public Access",
    aliases: [],
    cooldown: 30
}