import { Client, ActivityType } from 'discordjs';
import { getCollectionStats } from './collection.ts';
import { logger } from '../deps.ts';



/**
 * Updates the bot's status on Discord with the collection floor price.
 * @param client The Discord client instance.
 */
export async function updateStatus(client: Client) {
  try {
    // Fetch the collection floor price
    const floorPrice = await getCollectionStats();

    // Get the activity message from environment variables
    const activityMessage = Deno.env.get("ACTIVITY_MESSAGE");

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

    // console.log('Status updated successfully');
    logger.info('Status updated successfully');


    // Schedule the next status update after 30 seconds
    setTimeout(async () => await updateStatus(client), 30 * 1000);
  } catch (error) {
    logger.error('Error updating status:', error);
  }
}
