/**
* Logs
 */

import connect from '../database/connect';
import Log from '../models/Log';

export default async function handler(req, res) {
  await connect();

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

  return res.status(401).json({
    message: 'Invalid request method',
  })
}