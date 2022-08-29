/**
* Entries
 */

import connect from '../database/connect';
import Entry from '../models/Entry';
import { DateTime } from 'luxon';

export default async function handler(req, res) {
  await connect();

  const { query } = req;

  /**
   * Get entries
   */
  
  // Pagination settings
  const perPage = Number(query.perPage ?? 25);
  const page = Number(query.page ?? 1);
  const skip = page > 0 ? (page - 1) * perPage : 0;

  if (req.method === 'GET') {
    const entries = await Entry.aggregate([
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

    return res.status(200).json(entries);
  }

  return res.status(401).json({
    message: 'Invalid request method',
  })
}