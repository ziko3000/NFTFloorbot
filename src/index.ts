import { Bot } from './bot.ts';
import { logger } from '../deps.ts';
import { BotEvents } from './bot.ts';

logger.info('Starting index...');
const bot = new Bot();
bot.start();
