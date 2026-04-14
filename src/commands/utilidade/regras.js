const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

const logoUrl = 'https://media.discordapp.net/attachments/1492581733386948618/1492640249577341099/voxy_networking_logo_02.png?ex=69dc110f&is=69dabf8f&hm=743a750f3c7e3e923bb24d1b12b2bb426c2ce9210c35fbb6622d667d834b5099&=&format=webp&quality=lossless&width=856&height=856';
const bannerUrl = 'https://media.discordapp.net/attachments/1492581733386948618/1492640266199236699/voxy_networking_banner_03.png?ex=69dc1113&is=69dabf93&hm=5cd94571ac7bb3b97c822e21a596e30c7203ee36a6985814b993133684963369&=&format=webp&quality=lossless';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('regras')
        .setDescription('Envia o painel de regras da Voxy Networking.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        const guildIcon = interaction.guild.iconURL();

        const embedPT = new EmbedBuilder()
            .setTitle('📜 Regras — Voxy Networking 🇧🇷')
            .setColor('#8A2BE1')
            .setThumbnail(logoUrl)
            .addFields(
                {
                    name: '🟣 Regras do Discord',
                    value: '1. **Respeito acima de tudo:** Trate todos os membros com respeito. Ofensas, preconceito ou toxicidade não serão tolerados.\n2. **Sem spam ou flood:** Evite enviar mensagens repetidas, flood ou uso excessivo de caps.\n3. **Conteúdo inadequado é proibido:** Não envie conteúdo NSFW, ofensivo ou impróprio.\n4. **Uso correto dos canais:** Utilize cada canal para o seu propósito.\n5. **Proibido divulgar sem permissão:** Não divulgue servidores, links ou projetos sem autorização da staff.\n6. **Sem discussões tóxicas:** Discussões são permitidas, mas brigas, provocações e tretas não.\n7. **Não se passe por outros:** Fingir ser staff ou outro membro resultará em punição.\n8. **Respeite a staff:** As decisões da equipe devem ser respeadas.\n9. **Evite assuntos sensíveis:** Política, religião e temas polêmicos devem ser evitados.\n10. **Siga os termos do Discord:** Qualquer violação das regras do Discord também é proibida aqui.\n\n⚠️ *O descumprimento pode resultar em mute, kick ou ban.*'
                },
                {
                    name: '🌌 Regras do Skyblock',
                    value: '1. **Proibido uso de hacks:** Qualquer tipo de hack ou trapaça resultará em banimento.\n2. **Exploits são proibidos:** Abusar de bugs ou falhas não é permitido.\n3. **Respeite outros jogadores:** Ofensas e comportamento abusivo não serão tolerados.\n4. **Não faça scam:** Enganar jogadores em trocas ou vendas é proibido.\n5. **Uso justo da economia:** Manipulação abusiva não é permitida.\n6. **Não abuse de farms:** Farms que causam lag extremo podem ser removidas.\n7. **Contas alternativas:** Uso para vantagem indevida é proibido.\n8. **Nome e skin apropriados:** Nada ofensivo ou inapropriado.\n9. **Respeite as decisões da staff:** A staff tem a palavra final.\n10. **Jogue limpo:** Qualquer comportamento que prejudique outros será punido.\n11. **Proibido burlar o AFK:** Não é permitido usar macros, máquinas ou mods para evitar kick por inatividade.\n\n⚠️ *Punições podem incluir reset de progresso, ban temporário ou permanente.*'
                }
            )
            .setFooter({ text: 'Voxy Networking', iconURL: guildIcon });

        const embedEN = new EmbedBuilder()
            .setTitle('📜 Rules — Voxy Networking 🇺🇸')
            .setColor('#4C0082')
            .setThumbnail(logoUrl)
            .addFields(
                {
                    name: '🟣 Discord Rules',
                    value: '1. **Respect above all:** Treat all members with respect. Offenses, prejudice, or toxicity will not be tolerated.\n2. **No spam or flood:** Avoid repeated messages, flooding, or excessive caps.\n3. **Inappropriate content is prohibited:** Do not send NSFW, offensive, or inappropriate content.\n4. **Correct channel usage:** Use each channel for its intended purpose.\n5. **No unauthorized advertising:** Do not share servers, links, or projects without staff permission.\n6. **No toxic arguments:** Discussions are allowed, but fights and drama are not.\n7. **Do not impersonate others:** Pretending to be staff or another member will result in punishment.\n8. **Respect the staff:** Team decisions must be respected.\n9. **Avoid sensitive topics:** Politics, religion, and controversial themes should be avoided.\n10. **Follow Discord TOS:** Any violation of Discord terms is also prohibited here.\n\n⚠️ *Failure to comply may result in a mute, kick, or ban.*'
                },
                {
                    name: '🌌 Skyblock Rules',
                    value: '1. **No hacks allowed:** Any hack or cheat will result in a ban.\n2. **Exploits are prohibited:** Abusing bugs or flaws is not allowed.\n3. **Respect other players:** Offenses and abusive behavior will not be tolerated.\n4. **No scamming:** Deceiving players in trades or sales is prohibited.\n5. **Fair use of economy:** Abusive manipulation is not allowed.\n6. **Do not abuse farms:** Farms causing extreme lag may be removed.\n7. **Alternative accounts:** Use for unfair advantage is prohibited.\n8. **Appropriate name and skin:** Nothing offensive or inappropriate.\n9. **Respect staff decisions:** Staff has the final say.\n10. **Play fair:** Any behavior harming others will be punished.\n11. **No AFK evasion:** Using macros, machines, or mods to avoid AFK kicks is not allowed.\n\n⚠️ *Punishments may include progress reset, temporary, or permanent ban.*'
                }
            )
            .setImage(bannerUrl)
            .setFooter({ text: 'Voxy Networking', iconURL: guildIcon });

        const button = new ButtonBuilder()
            .setCustomId('aceitar_regras')
            .setLabel('Accept / Aceitar')
            .setEmoji('✅')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder().addComponents(button);

        await interaction.reply({ content: 'Painel enviado com sucesso!', ephemeral: true });
        await interaction.channel.send({ embeds: [embedPT, embedEN], components: [row] });
    }
};