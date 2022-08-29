import mongoose from 'mongoose';
import log from '../utils/log.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_DB_URL = process.env.MONGO_DB_URL ?? '';

log(
  `Database is ${
    MONGO_DB_URL?.split('@')?.[1]?.split('.')[0]
  }`
);


const connect = () =>
  mongoose.connection.on('Error on connection', (error) => log('Mogoose error', error));
  mongoose.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  });

export default connect;
