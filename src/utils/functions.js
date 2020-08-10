const fs = require('fs');

function loadCommands(bot) {
    fs.readdir('./src/commands/', (err, files) => {

        if (err) console.log(err);
    
        const jsfile = files.filter(f => f.split('.').pop() === 'js');
        if (jsfile.length <= 0) {
            return console.log('Bot Couldn\'t Find Commands in commands Folder.');
        }
    
        jsfile.forEach((f, i) => {
            const pull = require(`../commands/${f}`);
            bot.commands.set(pull.config.name, pull);
            pull.config.aliases.forEach(alias => {
                bot.aliases.set(alias, pull.config.name);
            });
        });
    });
}

function loadEvents(bot) {
    fs.readdir("./src/events/", (_err, files) => {
        files.forEach((file) => {
            if (!file.endsWith(".js")) return;
            const event = require(`../events/${file}`);
            let eventName = file.split(".")[0];
            bot.on(eventName, event.bind(null, bot));
            delete require.cache[require.resolve(`../events/${file}`)];
        });
    });
}

module.exports = {
    loadCommands,
    loadEvents
}