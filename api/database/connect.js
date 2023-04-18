import mongoose from 'mongoose';
import log from '../utils/log.js';

const MONGO_DB_URL = process.env.MONGO_DB_URL ?? 'mongodb://root:rootpassword@127.0.0.1:27017/bankehuset?authSource=admin';

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
