const express = require('express');

const router = express.Router();

const db = require('./data/db')

const { find, findById, insert, remove, update } = db;

// /api/posts
router.get('/', (req, res) => {
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

module.exports = router;
