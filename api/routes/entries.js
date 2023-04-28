/**
* Entries
 */

import connect from '../database/connect.js';
import Entry from '../models/Entry/index.js';
import { DateTime } from 'luxon';

export default async function handler(req, reply) {
  // await connect();

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

    return entries;
  }

  reply.statusCode = 422;

  return {
    message: 'Invalid request method',
  }
}