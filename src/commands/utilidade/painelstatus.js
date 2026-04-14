const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('painelticket')
        .setDescription('Envia o painel de atendimento (Tickets).')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle('🎫 Central de Atendimento | Support Center')
            .setColor('#8A2BE1')
            .setDescription('Selecione o departamento adequado abaixo para abrir seu ticket.\nSelect the appropriate department below to open your ticket.\n\n**⏰ Horário de Atendimento | Business Hours:**\n> Segunda a Sexta / Monday to Friday\n> `09:00 - 12:00` | `14:00 - 18:00` (BRT)\n*Tickets abertos aos sábados, domingos e feriados poderão ser respondidos, mas sem garantia de prazo.*\n*Tickets opened on weekends and holidays may be answered, but with no time guarantee.*\n\n**⚠️ Escopo de Suporte | Support Scope:**\n> Oferecemos suporte apenas para contas **Originais (Premium)** ou contas **Piratas (Cracked) com VIP ativo**.\n> *We only provide support for Premium (Original) accounts or Cracked accounts with an active VIP.*')
            .setThumbnail('https://media.discordapp.net/attachments/1492581733386948618/1492640249577341099/voxy_networking_logo_02.png?ex=69dc110f&is=69dabf8f&hm=743a750f3c7e3e923bb24d1b12b2bb426c2ce9210c35fbb6622d667d834b5099&=&format=webp&quality=lossless&width=856&height=856')
            .setImage('https://media.discordapp.net/attachments/1492581733386948618/1492640265851244584/voxy_networking_banner_04.png?ex=69dc1113&is=69dabf93&hm=c3c3e99bd0880c92b2ac28db27bd0c55279412925e22cfa531b7b7889d209d6d&=&format=webp&quality=lossless')
            .setFooter({ text: 'Voxy Networking', iconURL: interaction.guild.iconURL() });

        const select = new StringSelectMenuBuilder()
            .setCustomId('selecionar_departamento_ticket')
            .setPlaceholder('Selecione uma opção / Select an option...')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Suporte Geral | General Support')
                    .setDescription('Dúvidas in-game, problemas gerais e auxílio.')
                    .setValue('suporte')
                    .setEmoji('❓'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Loja e VIP | Store & Billing')
                    .setDescription('Dúvidas sobre compras, ativação de VIP e pagamentos.')
                    .setValue('loja')
                    .setEmoji('🛒'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Denúncias | Player Reports')
                    .setDescription('Denunciar jogadores por uso de hack, toxicidade, etc.')
                    .setValue('denuncia')
                    .setEmoji('🚨'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Revisão de Punição | Ban Appeal')
                    .setDescription('Contestar um banimento ou mute no servidor.')
                    .setValue('revisao')
                    .setEmoji('⚖️')
            );

        const row = new ActionRowBuilder().addComponents(select);

        await interaction.reply({ content: 'Painel enviado com sucesso!', ephemeral: true });
        await interaction.channel.send({ embeds: [embed], components: [row] });
    }
};