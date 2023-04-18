/**
* Logs
 */

import Entry from "../models/Entry/index.js";

export default async function handler(req, reply) {
  const { params: { id } } = req;
  const entry = await Entry.findById(id);

  if (!entry) {
    reply.statusCode = 404;
    reply.send({ message: 'Entry not found' });
  }

  try {
    await entry.remove()

  } catch (error) {
    reply.statusCode = 500;
    reply.send({ message: 'Failed to delete entry' });
  }
 
 reply.send({ message: 'Deleted entry' });
}