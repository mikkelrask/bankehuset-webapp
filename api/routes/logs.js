/**
* Logs
 */

import connect from '../database/connect.js';
import Log from '../models/Log.js';

export default async function handler(req, reply) {
  // await connect();

  const { query } = req;
  const perPage = Number(query.perPage ?? 25);
  const page = Number(query.page ?? 1);
  const skip = page > 0 ? (page - 1) * perPage : 0;

  if (req.method === 'GET') {
    const logs = await Log.aggregate([
      // Sort by latest
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          meta: [{ $count: 'total' }, { $addFields: { page, perPage } }],
          data: [{ $skip: skip }, { $limit: perPage }],
        },
      },
      {
        $unwind: '$meta',
      },
    ]).then((items) => items[0]);;

    return res.status(200).json(logs);
  }

  reply.statusCode = 401;

  return {
    message: 'Invalid request method',
  }
}