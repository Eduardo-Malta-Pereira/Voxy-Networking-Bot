module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Voxy Networking Bot online como ${client.user.tag}`);
    },
};