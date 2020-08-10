const userConfig = require('../../models/UserConfig');

async function giveCoins(id, amount) {
    let data = await userConfig.findOne({ userId: id });

    if (!data) return;

    data.coins += amount;

    await data.save();
}

async function findUser(id) {
    let data = await userConfig.findOne({ userId: id });

    return data;
}

async function giveBankSpace(id, amount) {
    let data = await userConfig.findOne({ userId: id });

    if (!data) return;

    data.bankSpace += amount;

    await data.save();
}

module.exports = {
    giveCoins,
    findUser,
    giveBankSpace
}