const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config.json');
const loadCommands = require('./src/handlers/commandHandler');
const loadEvents = require('./src/handlers/eventHandler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages
    ]
});

client.commands = new Collection();
client.config = config;

loadEvents(client);
loadCommands(client);

client.login(config.token);