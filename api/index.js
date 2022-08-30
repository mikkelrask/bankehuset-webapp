import path from 'path';
import Fastify from 'fastify';
import FastifyStatic from '@fastify/static';
import collect from './routes/collect.js';
import entries from './routes/entries.js';

const root = path.resolve('public')

// Require the framework and instantiate it
const app = Fastify({ logger: true })

app.register(FastifyStatic, {
  root,
  prefix: '/public',
  wildcard: true,
})

// API
app.register((fastify, opts, next) => {
  fastify.route({
    url: '/entries',
    method: 'GET',
    handler: entries
  });

  fastify.route({
    url: '/collect',
    method: 'POST',
    handler: collect,
    schema: {},
  });

  fastify.route({
    url: '/logs',
    method: 'GET',
    handler: entries
  });

  next();
}, { prefix: '/api' })

// Web app
app.get('/*', function (req, reply) {
  const isFile = req.url.split('.').length > 1;
  let file = `${req.url.replace(/\/+$/, '')}/index.html`;

  return req.url;

  if (isFile) {
    file = req.url;
  }

  console.log({file})

  reply.sendFile(file);
})

// Run the server!
const start = async () => {
  try {
    await app.listen({ port: 3000 })
  } catch (err) {
    console.error('Error:', err);
    app.log.error(err)
    process.exit(1)
  }
}

start()