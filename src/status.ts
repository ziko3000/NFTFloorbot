import { Client, ActivityType } from 'discord.js';
import { getCollectionStats } from './collection';

/**
 * Updates the bot's status on Discord with the collection floor price.
 * @param client The Discord client instance.
 */
export async function updateStatus(client: Client) {
  try {
    // Fetch the collection floor price
    const floorPrice = await getCollectionStats();

    // Get the activity message from environment variables
    const activityMessage = process.env.ACTIVITY_MESSAGE;

    if (!activityMessage) {
      console.error('ACTIVITY_MESSAGE is not defined in environment variables.');
      return;
    }

    // Replace "%collection_floor%" placeholder with the actual floor price
    const updatedActivityMessage = activityMessage.replace("%collection_floor%", parseFloat(`${floorPrice}`).toFixed(2));

    // Set the bot's presence with the updated activity message
    client.user?.setPresence({
      activities: [
        {
          name: updatedActivityMessage,
          type: ActivityType.Watching
        }
      ],
      status: 'online'
    });

    console.log('Status updated successfully');

    // Schedule the next status update after 4 seconds
    setTimeout(() => updateStatus(client), 4 * 1000);
  } catch (error: any) {
    console.error('Error updating status:', error.message);
  }
}
