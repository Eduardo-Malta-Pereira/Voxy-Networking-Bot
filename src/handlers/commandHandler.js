const fs = require('fs');
const { REST, Routes } = require('discord.js');

module.exports = async (client) => {
    const commands = [];
    const commandFolders = fs.readdirSync('./src/commands');

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            client.commands.set(command.data.name, command);
            commands.push(command.data.toJSON());
        }
    }

    const rest = new REST({ version: '10' }).setToken(client.config.token);

    try {
        await rest.put(
            Routes.applicationGuildCommands(client.config.clientId, client.config.guildId),
            { body: commands }
        );
    } catch (error) {
        console.error(error);
    }
};