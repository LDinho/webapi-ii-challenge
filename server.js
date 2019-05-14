const express = require('express');

const postsRouter = require('./posts-router');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter);


server.get('/', (req, res) => {
  console.log('inside get');
  res.json("The server is running!");

});

module.exports = server;
