import { Client, SlashCommandBuilder, REST, Routes, CommandInteraction } from 'npm:discord.js@14.12.1';
import { HelpCommand } from './commands/help.ts';
import { logger } from './deps.ts';



/**
 * Interface for the Bot commands.
 */
interface BotCommand {
  name: string;
  description: string;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

export class CommandHandler {
 
  commands: Map<string, BotCommand>;

  constructor() {
    this.commands = new Map<string, BotCommand>();

    this.registerCommand('help', 'Get help about the bot and its commands', (interaction) => new HelpCommand().execute(interaction));
  }

  registerCommand(name: string, description: string, execute: (interaction: CommandInteraction) => Promise<void>) {
    this.commands.set(name, { name, description, execute });
  }

  async registerCommandsToDiscord(client: Client): Promise<void> {
    const commandBuilders = Array.from(this.commands.values()).map(
      ({ name, description }) => new SlashCommandBuilder().setName(name).setDescription(description).toJSON()
    );
    console.log('DISCORD_BOT_TOKEN','COMMAND HANDLER')
    const rest = new REST({ version: '10' }).setToken(Deno.env.get("DISCORD_BOT_TOKEN"));
    await rest.put(
      Routes.applicationCommands(Deno.env.get("APPLICATION_ID")),
      { body: commandBuilders }
    );
  }

  async handleCommand(interaction: CommandInteraction): Promise<void> {
    const command = this.commands.get(interaction.commandName);
    if (command) {
      await command.execute(interaction);
    } else {
      console.error(`Command not found: ${interaction.commandName}`);
      logger.info(` LoggerCommand not found: ${interaction.commandName}`);
    }
  }
}
