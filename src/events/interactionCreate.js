const { ChannelType, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Houve um erro ao executar este comando! | There was an error executing this command!', ephemeral: true });
            }
        } else if (interaction.isButton()) {
            if (interaction.customId === 'aceitar_regras') {
                const roleId = client.config.roleRegrasId;
                const role = interaction.guild.roles.cache.get(roleId);
                const member = interaction.member;

                if (!role) {
                    return interaction.reply({ content: 'O cargo não foi encontrado. | The role was not found.', ephemeral: true });
                }

                if (member.roles.cache.has(roleId)) {
                    return interaction.reply({ content: 'Você já aceitou as regras e possui o cargo! | You have already accepted the rules and have the role!', ephemeral: true });
                }

                try {
                    await member.roles.add(role);
                    await interaction.reply({ content: 'Regras aceitas! Você recebeu o cargo. | Rules accepted! You received the role.', ephemeral: true });
                } catch (error) {
                    console.error(error);
                    await interaction.reply({ content: 'Erro ao atribuir o cargo. Verifique a hierarquia de cargos do bot. | Error assigning the role. Check the bot role hierarchy.', ephemeral: true });
                }
            } else if (interaction.customId === 'fechar_ticket') {
                await interaction.reply({ content: 'Gerando transcript e fechando ticket em 5 segundos... | Generating transcript and closing ticket in 5 seconds...' });

                const transcriptChannelId = '1492620691684462773';
                const transcriptChannel = interaction.guild.channels.cache.get(transcriptChannelId);

                try {
                    const attachment = await discordTranscripts.createTranscript(interaction.channel, {
                        limit: -1,
                        returnType: 'attachment',
                        filename: `${interaction.channel.name}.html`,
                        saveImages: true,
                        poweredBy: false
                    });

                    if (transcriptChannel) {
                        const embed = new EmbedBuilder()
                            .setTitle('📄 Transcript de Ticket')
                            .setColor('#8A2BE1')
                            .addFields(
                                { name: 'Ticket', value: interaction.channel.name, inline: true },
                                { name: 'Fechado por | Closed by', value: `${interaction.user}`, inline: true }
                            )
                            .setFooter({ text: 'Voxy Networking' })
                            .setTimestamp();

                        await transcriptChannel.send({ embeds: [embed], files: [attachment] });
                    }
                } catch (error) {
                    console.error(error);
                }

                setTimeout(() => {
                    interaction.channel.delete().catch(console.error);
                }, 5000);
            }
        } else if (interaction.isStringSelectMenu()) {
            if (interaction.customId === 'selecionar_departamento_ticket') {
                const categoriaSelecionada = interaction.values[0];
                const staffRoles = [
                    '1492527985935257782',
                    '1492533143524085871',
                    '1492533656768479242',
                    '1492533709151146080'
                ];
                const categoryId = '1492606625997918299';

                const ticketName = `ticket-${categoriaSelecionada}-${interaction.user.username.toLowerCase()}`;
                const existingChannel = interaction.guild.channels.cache.find(c => c.name.includes(interaction.user.username.toLowerCase()) && c.parentId === categoryId);

                if (existingChannel) {
                    return interaction.reply({ content: `Você já possui um ticket aberto em ${existingChannel}. | You already have an open ticket.`, ephemeral: true });
                }

                const permissionOverwrites = [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                        id: interaction.user.id,
                        allow: [
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.ReadMessageHistory,
                            PermissionFlagsBits.AttachFiles
                        ],
                    }
                ];

                staffRoles.forEach(roleId => {
                    permissionOverwrites.push({
                        id: roleId,
                        allow: [
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.ReadMessageHistory,
                            PermissionFlagsBits.ManageMessages
                        ]
                    });
                });

                try {
                    const ticketChannel = await interaction.guild.channels.create({
                        name: ticketName,
                        type: ChannelType.GuildText,
                        parent: categoryId,
                        permissionOverwrites: permissionOverwrites
                    });

                    let descPT = '';
                    let descEN = '';

                    switch (categoriaSelecionada) {
                        case 'suporte':
                            descPT = 'Descreva seu problema, informe seu Nickname in-game e envie prints se necessário.';
                            descEN = 'Describe your issue, provide your in-game Nickname, and send screenshots if necessary.';
                            break;
                        case 'loja':
                            descPT = 'Informe seu Nickname, o ID da transação e qual produto foi adquirido.';
                            descEN = 'Provide your Nickname, the transaction ID, and which product was purchased.';
                            break;
                        case 'denuncia':
                            descPT = 'Informe o Nickname do infrator, a regra violada e anexe as provas (prints ou vídeos).';
                            descEN = 'Provide the offender\'s Nickname, the broken rule, and attach evidence (screenshots or videos).';
                            break;
                        case 'revisao':
                            descPT = 'Informe seu Nickname, quem aplicou a punição e explique por que sua punição deve ser removida.';
                            descEN = 'Provide your Nickname, who applied the punishment, and explain why your punishment should be removed.';
                            break;
                        default:
                            descPT = 'Descreva seu problema com o máximo de detalhes.';
                            descEN = 'Please describe your issue with as much detail as possible.';
                    }

                    const avisoPT = '\n\n⚠️ **ATENÇÃO:** Aguarde a resposta do suporte. Forçar ou apressar o atendimento resultará no encerramento do ticket e possíveis punições.';
                    const avisoEN = '\n⚠️ **WARNING:** Please wait for the support team to reply. Forcing or rushing the assistance will result in the ticket being closed and possible punishments.';

                    const embed = new EmbedBuilder()
                        .setTitle(`🎫 Atendimento: ${categoriaSelecionada.toUpperCase()}`)
                        .setColor('#8A2BE1')
                        .setDescription(`Olá ${interaction.user}, a equipe da **Voxy Networking** logo irá ajudá-lo.\n\n🇧🇷 ${descPT}${avisoPT}\n\n🇺🇸 ${descEN}${avisoEN}`)
                        .setFooter({ text: 'Voxy Networking' })
                        .setTimestamp();

                    const closeButton = new ButtonBuilder()
                        .setCustomId('fechar_ticket')
                        .setLabel('Fechar Ticket / Close Ticket')
                        .setEmoji('🔒')
                        .setStyle(ButtonStyle.Danger);

                    const row = new ActionRowBuilder().addComponents(closeButton);

                    await ticketChannel.send({ content: `${interaction.user} <@&1492533709151146080>`, embeds: [embed], components: [row] });
                    await interaction.reply({ content: `Seu ticket foi criado: ${ticketChannel} | Your ticket has been created.`, ephemeral: true });
                } catch (error) {
                    console.error(error);
                    await interaction.reply({ content: 'Erro ao criar o ticket. | Error creating the ticket.', ephemeral: true });
                }
            }
        }
    }
};