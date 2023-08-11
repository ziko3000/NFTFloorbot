<h1 align="center">Discord Bot - Collection Floor Price Tracker 📈</h1>

<div align="center">
  <sub>Built with ❤️ by
  <a href="https://github.com/ziko3000">Min Fam</a>
  </sub>
</div>

<p align="center">
A Discord bot that tracks the floor price of an OpenSea collection and updates the bot's presence with the latest floor price.
</p>

## 📝 Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## 🏁 Getting Started <a name = "getting-started"></a>

To get started with the Collection Floor Price Tracker Discord bot, follow the instructions below.

### Prerequisites <a name = "prerequisites"></a>

To run this bot, you'll need to have the following:

- Node.js (version 14.0.0 or newer)
- A Discord bot token, which you can obtain by creating a bot on the [Discord Developer Portal](https://discord.com/developers/applications)
- OpenSea API key
- Environment variables file (`.env`) to store your sensitive information
- Deno

### Installation <a name = "installation"></a>

1. Clone this repository:

    ```bash
    git clone https://github.com/ziko3000/Discord-Bot-Collection-Floor-Price-Tracker.git](https://github.com/ziko3000/NFTFloorbot
    ```

2. Change into the cloned repository:

    ```bash
    cd Discord-Bot-Collection-Floor-Price-Tracker
    ```

3. Install the dependencies:

    ```bash
    winget install --id DenoLand.Deno -e
    ```

4. Create a `.env` file in the root of your project and add the following environment variables:

    ```
    DISCORD_BOT_TOKEN=YourDiscordBotToken
    OPENSEA_API_KEY=YourOpenSeaAPIKey
    COLLECTION_NAME=YourCollectionName
    ACTIVITY_MESSAGE=Floor Price: %collection_floor%
    APPLICATION_ID= Discord Application Id
    ```

   Replace `YourDiscordBotToken`, `YourOpenSeaAPIKey`, and `YourCollectionName` with your actual values. The `ACTIVITY_MESSAGE` is the message that will be displayed in the bot's presence with the `%collection_floor%` placeholder representing the collection floor price.

5. Start the bot:

    ```bash
    deno task run_bot
    ```

The bot will now be running and tracking the floor price of the specified OpenSea collection.

## 🎈 Usage <a name = "usage"></a>

The Collection Floor Price Tracker bot updates its presence with the latest floor price of the specified OpenSea collection. It does this automatically every 4 seconds.


## 📄 License <a name = "license"></a>

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
