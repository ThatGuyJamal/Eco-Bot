const currencyFunctions = require('../utils/currencyFunctions');
const userConfig = require('../../models/UserConfig');

module.exports = async (bot, member) => {
    if (member.user.bot) return;

    let data = await currencyFunctions.findUser(member.id, member.guild.id);
    
    if (!data) {
        const newData = new userConfig({
            userId: member.id,
            guildId: member.guild.id
        });
        newData.save();
    }
}