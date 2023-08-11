import { CommandInteraction, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discordjs';
import { logger } from '../../deps.ts';


/**
 * HelpCommand class for providing help about the bot and its commands.
 */
logger.info('hello world');
export class HelpCommand {
  /**
   * Execute the help command.
   * @param {CommandInteraction} interaction - The interaction instance.
   * @throws {Error} When unable to reply to the interaction.
   * @returns {Promise<void>} Nothing.
   */
  async execute(interaction: CommandInteraction): Promise<void> {
    try {
      const helpEmbed = new EmbedBuilder()
        .setTitle('Bot Help')
        .setDescription('This bot provides information about the Fear and Greed Index. You can interact with the bot using the following commands:')
        .setColor('#0099ff')
        .addFields(
          { name: '/help', value: '** - Get help about the bot and its commands**' },
        );

        const supportButton = new ButtonBuilder()
        .setLabel('Support')
        .setURL('https://t.me/shyngys_dev')
        .setStyle(ButtonStyle.Link)
        
        const row1 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(supportButton);

        const gitHubButton = new ButtonBuilder()
        .setLabel('GitHub')
        .setURL('https://github.com/ziko3000')
        .setStyle(ButtonStyle.Link)
        const row2 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(gitHubButton);

        const joinGuildButton = new ButtonBuilder()
        .setLabel('Our Discord Channel')
        .setURL('https://discord.gg/fZjqrAyPVb')
        .setStyle(ButtonStyle.Link)
        const row3 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(joinGuildButton);

      await interaction.reply({ embeds: [helpEmbed], components: [row1, row2, row3] });
    } catch (error) {
      const message = (error instanceof Error) ? error.message : 'Unexpected error occurred';
      throw new Error(`Failed to reply to the interaction: ${message}`);
    }
  }

}
