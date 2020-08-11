const userConfig = require('../../models/UserConfig');

async function giveCoins(id, guildId, amount) {
    let data = await userConfig.findOne({ userId: id, guildId: guildId });

    if (!data) return;

    data.coins += amount;

    await data.save();
}

async function findUser(userId, guildId) {
    let data = await userConfig.findOne({ userId: userId, guildId: guildId });

    return data;
}

async function giveBankSpace(userId, guildId, amount) {
    let data = await userConfig.findOne({ userId: userId, guildId: guildId });

    if (!data) return;

    data.bankSpace += amount;

    await data.save();
}

module.exports = {
    giveCoins,
    findUser,
    giveBankSpace
}