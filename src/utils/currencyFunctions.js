const userConfig = require('../../models/UserConfig');

class currencyFunctions {
    /**
     * 
     * @param {string} [userId] - A Discord user ID
     * @param {striing} [guildId] - A Discord guild ID
     * @param {string} [amount] - Amount of coins to give
     */

    static async giveCoins(userId, guildId, amount) {
        let data = await userConfig.findOne({ userId: userId, guildId: guildId });

        if (!data) return;
    
        data.coins += amount;
    
        await data.save();
    }

    /**
     * 
     * @param {string} [userId] - A Discord user ID
     * @param {string} [guildId] - A Discord guild ID
     */

    static async findUser(userId, guildId) {
        let data = await userConfig.findOne({ userId: userId, guildId: guildId });

        return data;
    }

    /**
     * 
     * @param {string} [userId] - A Discord user ID
     * @param {string} [guildId] - A Discord guild ID
     * @param {number} [amount] - Amount of bank space to give
     */

    static async giveBankSpace(userId, guildId, amount) {
        let data = await userConfig.findOne({ userId: userId, guildId: guildId });

        if (!data) return;
    
        data.bankSpace += amount;
    
        await data.save();
    }

    /**
     * 
     * @param {string} [userId] - A Discord user ID
     * @param {string} [guildId] - A Discord guild ID
     */

    static async removeAllCoins(userId, guildId) {
        let data = await userConfig.findOne({ userId: userId, guildId: guildId });

        if (!data) return;
    
        data.coins -= data.coins;
    
        await data.save();
    }
}

module.exports = currencyFunctions;