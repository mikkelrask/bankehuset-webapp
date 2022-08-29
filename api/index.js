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
app.get('/', function (req, reply) {
  reply.sendFile('index.html');
})

app.get('/log', function (req, reply) {
  reply.sendFile('log/index.html');
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