const { EmbedBuilder } = require('discord.js');

const bannerUrl = 'https://media.discordapp.net/attachments/1492581733386948618/1492640266824454176/voxy_networking_banner_02.png?ex=69dc1113&is=69dabf93&hm=788abbd99d71cbd546542f065167e7662b58b2a6a6fab0bfaff6b948051f394b&=&format=webp&quality=lossless';

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        const welcomeChannelId = '1492555700650508451';
        const regrasChannelId = '1492555412883505274';
        const statusChannelId = '1492555735840591954';

        const channel = member.guild.channels.cache.get(welcomeChannelId);
        
        if (!channel) return;

        const memberCount = member.guild.memberCount;

        const embed = new EmbedBuilder()
            .setTitle('🎉 Bem-vindo(a)! | Welcome!')
            .setColor('#8A2BE1')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setDescription(`Olá ${member}, seja muito bem-vindo(a) à **Voxy Networking**!\nVocê é o nosso membro de número **#${memberCount}**.\n\nHello ${member}, welcome to **Voxy Networking**!\nYou are our member number **#${memberCount}**.`)
            .addFields(
                {
                    name: '📌 Canais Importantes | Important Channels',
                    value: `> <#${regrasChannelId}>: Leia as regras para liberar seu acesso. | Read the rules to unlock your access.\n> <#${welcomeChannelId}>: É onde estamos agora! | This is where we are now!\n> <#${statusChannelId}>: Acompanhe o status dos nossos servidores. | Check the status of our servers.`
                }
            )
            .setImage(bannerUrl)
            .setFooter({ text: 'Voxy Networking', iconURL: member.guild.iconURL() })
            .setTimestamp();

        try {
            await channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
        }
    }
};