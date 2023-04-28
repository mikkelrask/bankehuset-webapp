import connect from '../database/connect.js';
import Entry from '../models/Entry/index.js';
import Log from '../models/Log/index.js';
import fetchWeatherData from '../utils/fetchWeatherData.js';

export default async function handler(req, reply) {
  try {
    // await connect();

    const { body } = req;

    const log = async (message, data = {}) => {
      await Log.create({
        message: body.test ? `[TEST] ${message}` : message,
        data
      });
    }

    log('Hit endpoint with data', { body })

    if (typeof body !== 'object') {
      log('Missing body', { body })

      return res.status(400).json({
        message: 'Missing data',
      });
    }

    if (!body.temperature) {
      log('Missing temperature', { body })

      return res.status(400).json({
        message: 'Missing temperature',
      });
    }

    const data = await fetchWeatherData();

    const entry = await Entry.create({ 
      ...body, 
      data
    })

    log('Successful entry', {
      body,
      entry
    });

    return { 
      entry, 
      debug: { 
        bodyType: typeof body,
        body
      } 
    }
  } catch (error) {
    log('Unknown failure', {
      error,
      errorText: error.toString()
    });
  }
}
