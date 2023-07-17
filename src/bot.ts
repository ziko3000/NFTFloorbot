import { Client, GatewayIntentBits, Partials } from 'discord.js';
import dotenv from 'dotenv';
import { getCollectionStats } from './collection';
import { updateStatus } from './status';

dotenv.config();

/**
 * Represents the Discord bot.
 */
export class Bot {
  private client: Client;

  constructor() {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
  }

  /**
   * Starts the bot.
   */
  public async start() {
    try {
      await this.client.login(process.env.DISCORD_BOT_TOKEN);
      console.log('Logged in successfully');
      updateStatus(this.client);
    } catch (error: any) {
      console.error('Error starting the bot:', error.message);
    }
  }
}
