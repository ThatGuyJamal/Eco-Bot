module.exports.run = async (bot, message, args) => {
    message.channel.send('Test Command Works');
}

module.exports.config = {
    name: "test",
    description: "Test Command.",
    usage: "eco test",
    accessableby: "Public Access",
    aliases: [],
    cooldown: 5
}