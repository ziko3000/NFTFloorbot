import { Client, GatewayIntentBits, Partials, ActivityType } from 'discord.js';
import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

interface CollectionStats {
  stats: {
    floor_price: number;
  };
}

class Bot {
  private client: Client;

  constructor() {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });
  }

  public async start() {
    try {
      await this.client.login(process.env.DISCORD_BOT_TOKEN);
      console.log('Logged in successfully');
      this.updateStatus();
    } catch (error: any) {
      console.error('Error starting the bot:', error.message);
    }
  }

  private async getCollectionStats(): Promise<number | string> {
    try {
      const apiUrl = `https://api.opensea.io/collection/${process.env.COLLECTION_NAME}/stats`;
      const headers = {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.OPENSEA_API_KEY,
      };

      const response: AxiosResponse<CollectionStats> = await axios.get(apiUrl, { headers });

      if (response.status === 200) {
        const floorPrice = response.data.stats.floor_price;
        return floorPrice;
      }

      return "Couldn't fetch the floor price.";
    } catch (error: any) {
      console.error('Error fetching the collection stats:', error.message);
      return "Couldn't fetch the floor price.";
    }
  }

  private async updateStatus() {
    try {
      const floorPrice = await this.getCollectionStats();
      const activityMessage = process.env.ACTIVITY_MESSAGE;

      if (!activityMessage) {
        console.error('ACTIVITY_MESSAGE is not defined in environment variables.');
        return;
      }

      this.client.user?.setPresence({
        activities: [
          {
            name: activityMessage.replace(/%collection_floor%/g, parseFloat(`${floorPrice}`).toFixed(2)),
            type: ActivityType.Watching
          }
        ],
        status: 'online'
      });
      console.log('Status updated successfully');
      setTimeout(() => this.updateStatus(), 4 * 1000);
    } catch (error: any) {
      console.error('Error updating status:', error.message);
    }
  }
}

const bot = new Bot();
bot.start();
