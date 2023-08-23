import { Logger } from 'logger';
const logger = new Logger();
export { logger };


import { load } from 'dotenv';
logger.info(load);
const loadEnv = await load({
  envPath: './.env',
  export: true,
  examplePath: './.env.example',
  allowEmptyValues: false,
});

