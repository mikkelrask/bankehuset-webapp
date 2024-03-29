import path from 'path';
import Fastify from 'fastify';
import FastifyStatic from '@fastify/static';
import collect from './routes/collect.js';
import deleteEntry from './routes/delete.js';
import entries from './routes/entries.js';
import connect from './database/connect.js';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config({
  path: path.resolve(__dirname, '../.env')
});

const root = path.resolve(__dirname, '../public')

// Require the framework and instantiate it
const app = Fastify({ logger: true })

await app.register(cors, { 
  // put your options here
})


app.register(FastifyStatic, {
  root,
  prefixAvoidTrailingSlash: true,
  wildcard: false,
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

  fastify.route({
    url: '/:id',
    method: 'DELETE',
    handler: deleteEntry
  });

  next();
}, { prefix: '/api' })

// Web app
app.get('/*', function (req, reply) {
  const isFile = req.url.split('.').length > 1;
  let file = `${req.url.replace(/\/+$/, '')}/index.html`;

console.log('req.url', req.url)

  if (isFile) {
    file = req.url;
  }

  console.log({root, file})

  reply.sendFile(file);
})

// Run the server!
const start = async () => {
  try {
    // Connect to database
    connect().then(async () => {
    console.log('💾 Connected to database');
    }).catch(error => {
      console.log('Failed to connect to database');
    });

    await app.listen({ port: 3000 })
  } catch (err) {
    console.error('Error:', err);
    app.log.error(err)
    process.exit(1)
  }
}

start()