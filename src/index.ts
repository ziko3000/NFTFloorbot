import { Bot } from './bot.ts';
import { logger } from './deps.ts';

logger.info('Starting index...');
const bot = new Bot();
bot.start();
