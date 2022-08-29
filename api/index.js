import path from 'path';
import { dirname } from 'path';
import Fastify from 'fastify';
import FastifyStatic from '@fastify/static';

const root = path.resolve('public')

// Require the framework and instantiate it
const fastify = Fastify({ logger: true })

fastify.register(FastifyStatic, {
  root,
  wildcard: true,
})

// Declare a route
fastify.get('/', function (req, reply) {
  reply.sendFile('index.html');
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()