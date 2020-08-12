const userConfig = require('../../models/UserConfig');

class currencyFunctions {
    /**
     * 
     * @param {string} [userId] - A Discord user ID
     * @param {string} [guildId] - A Discord guild ID
     * @param {string} [amount] - Amount of coins to give
     * 
     * @example 
     * const currencyFunctions = require('../utils/currencyFunctions');
     * 
     * bot.on('message', async message => {
     *      const random = Math.floor(Math.random() * 24) + 1;
     * 
     *      giveCoins(message.author.id, message.guild.id, random);
     * });
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
     * 
     * @example
     * const currencyFunctions = require('../utils/currencyFunctions');
     * 
     * let data = await currencyFunctions.findUser(some_id, some_guild_id);
     * 
     * console.log(data);
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
     * 
     * @example
     * const currencyFunctions = require('../utils/currencyFunctions');
     * 
     * const random = Math.floor(Math.random() * 24) + 1;
     * 
     * currencyFunctions.giveBankSpace(some_id, some_guild_id, random);
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
     * 
     * @example
     * const currencyFunctions = require("../utils/currencyFunctions");
     * 
     * currencyFunctions.removeAllCoins(some_id, some_guild_id);
     */

    static async removeAllCoins(userId, guildId) {
        let data = await userConfig.findOne({ userId: userId, guildId: guildId });

        if (!data) return;
    
        data.coins -= data.coins;
    
        await data.save();
    }
}

module.exports = currencyFunctions;