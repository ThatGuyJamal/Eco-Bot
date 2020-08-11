const { findUser } = require('../utils/currencyFunctions');
const userConfig = require('../../models/UserConfig');

module.exports = async (bot, member) => {
    if (member.user.bot) return;

    let data = await findUser(member.id);
    
    if (!data) {
        const newData = new userConfig({
            userId: member.id
        });
        newData.save();
    }
}