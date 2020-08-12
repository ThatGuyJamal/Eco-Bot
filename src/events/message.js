const { Collection, MessageEmbed } = require('discord.js');
const currencyFunctions = require('../utils/currencyFunctions');
const userConfig = require('../../models/UserConfig');
const prettyMilliseconds = require('pretty-ms');

module.exports = async (bot, message) => {
    const prefix = 'eco';
    if (message.author.bot || message.channel.type === 'dm') return;

    const messageArray = message.content.split(' ');
    const cmd = messageArray[1];
    const args = messageArray.slice(2);

    if (message.content.toLowerCase().startsWith(prefix)) {
        const commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));

        if (commandfile) {

            if (!bot.cooldowns.has(commandfile.config.name)) {
                bot.cooldowns.set(commandfile.config.name, new Collection());
            }

            const now = Date.now();
            const timestamps = bot.cooldowns.get(commandfile.config.name);
            const cooldownAmount = (commandfile.config.cooldown || 3) * 1000;

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    const cooldownEmbed = new MessageEmbed()
                    .setTitle('Cooldown')
                    .setDescription(`This command is on a cooldown, try again in \`${prettyMilliseconds(timeLeft)}\`.\n\nThe default cooldown on this command is \`${prettyMilliseconds(commandfile.config.cooldown * 1000)}\`.`)
                    .setColor(0x3c54b4);
                    return message.channel.send(cooldownEmbed);
                }
            } else {
                commandfile.run(bot, message, args);
                const randomSpace = Math.round(Math.random() * 39) + 1;
                currencyFunctions.giveBankSpace(message.author.id, message.guild.id, randomSpace);
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        }
    } else {
        if (message.author.bot) return;

        await currencyFunctions.findUser(message.author.id, message.guild.id).then(data => {
            if (!data) {
                let newData = new userConfig({
                    userId: message.author.id,
                    guildId: message.guild.id
                });
                newData.save();
            }
        });
    }
}