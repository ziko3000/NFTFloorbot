import { Client, ActivityType, Interaction, CommandInteraction,PresenceData } from 'npm:discord.js@14.12.1';
import { CommandHandler } from './CommandHandler.ts';

export class BotEvents {
    client: Client;
    commandHandler: CommandHandler;
    
  
    constructor(client: Client, commandHandler: CommandHandler ) {
      this.client = client;
      this.commandHandler = commandHandler;
  
      // Set up bot event listeners
      this.client.on('ready', () => this.onReady());
      this.client.on('interactionCreate', async (interaction: Interaction) => {
        if (interaction.isCommand()) {
          await this.commandHandler.handleCommand(interaction as CommandInteraction);
        }
      });
    }
  
    /**
     * Fear & Greed Index data storing.
     * @return {Promise<void>}
     */
    async onReady(): Promise<void> {
      console.log(`Logged in as ${this.client.user!.tag}`);
    
      // Register the slash commands to Discord
      try {
        await this.commandHandler.registerCommandsToDiscord(this.client);
        console.log('Slash commands registered successfully!');
      } catch (error) {
        console.error('Failed to register slash commands:', error);
      }
    }
}