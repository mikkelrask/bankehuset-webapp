import mongoose from 'mongoose';
import log from '../utils/log.js';
import dotenv from 'dotenv';

dotenv.config();

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
