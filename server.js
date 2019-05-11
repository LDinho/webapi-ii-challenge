const express = require('express');

const PostsRouter = require('./posts-router');

const server = express();

server.use(express.json());
server.use('/api/posts', PostsRouter);


server.get('/', (req, res) => {
  console.log('inside get');
  res.json("The server is running!");

});

module.exports = server;
