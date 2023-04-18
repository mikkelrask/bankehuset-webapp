import mongoose from 'mongoose';
import log from '../utils/log.js';

// import path from 'path';
// import { fileURLToPath } from 'url';
// import dotenv from 'dotenv';

// const loadEnv = () => {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);
//   const envPath = path.resolve(__dirname, '.env');
//   console.log('Load env file', envPath);
//   dotenv.config({ path: envPath });
// }

// loadEnv();

const MONGO_DB_URL = process.env.MONGO_DB_URL ?? '';

log(
  `Database URL: ${MONGO_DB_URL}`
);

mongoose.connection.on('Error on connection', (error) => log('Mogoose error', error));

const connect = () =>
  mongoose.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  });

export default connect;
