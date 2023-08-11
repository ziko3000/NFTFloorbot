import { Client, GatewayIntentBits, Partials } from 'npm:discord.js@14.12.1';
import { logger } from './deps.ts';
import { getCollectionStats } from './collection.ts';
import { updateStatus } from './status.ts';
import { BotEvents } from './botEvents.ts';
import { CommandHandler } from './CommandHandler.ts';



/**
 * Represents the Discord bot.
 */
export class Bot {
  client: Client;
  commandHandler: CommandHandler;
  botEvents: BotEvents;

  constructor() {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
    this.commandHandler = new CommandHandler(); 
    this.botEvents = new BotEvents(this.client, this.commandHandler);
  }

  /**
   * Starts the bot.
   */
  public async start() {
    try {
      console.log(Deno.env.get("DISCORD_BOT_TOKEN"));
      await this.client.login(Deno.env.get("DISCORD_BOT_TOKEN"));
      logger.info('Logged in successfully');
      updateStatus(this.client);
    } catch (error: any) {
      console.error('Error starting the bot:', error.message);
    }
  }
  
}



