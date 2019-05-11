const express = require('express');

const db = require('./data/db')

const server = express();

server.use(express.json());

const { find, findById, insert, remove, update } = db;

server.get('/', (req, res) => {
  console.log('inside get');
  res.json("The server is running!");

});

server.get('/api/posts', (req, res) => {
  find()
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(500)
          .json({
            error: "The posts information could not be retrieved."
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    })

});

module.exports = server;
