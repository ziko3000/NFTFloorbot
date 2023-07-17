import axios, { AxiosResponse } from 'axios';

// Interface for the collection statistics
interface CollectionStats {
  stats: {
    floor_price: number;
  };
}

/**
 * Fetches the collection statistics, specifically the floor price.
 * @returns The floor price of the collection as a number or a string indicating an error.
 */
export async function getCollectionStats(): Promise<number | string> {
  try {
    const apiUrl = `https://api.opensea.io/collection/${process.env.COLLECTION_NAME}/stats`;
    const headers = {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.OPENSEA_API_KEY,
    };

    // Send a GET request to the OpenSea API to fetch collection stats
    const response: AxiosResponse<CollectionStats> = await axios.get(apiUrl, { headers });

    if (response.status === 200) {
      // Extract the floor price from the response data
      const floorPrice = response.data.stats.floor_price;
      console.log('Floor price fetched successfully');
      return floorPrice;
    }

    return "Couldn't fetch the floor price.";
  } catch (error: any) {
    console.error('Error fetching the collection stats:', error.message);
    return "Couldn't fetch the floor price.";
  }
}
