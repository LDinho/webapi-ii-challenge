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

router.get('/:id', (req, res) => {
  const { id } = req.params;

  findById(id)
    .then((post) => {
      if (post.length) {
        res.status(200).json(post);
      } else {
        res.status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The post information could not be retrieved." });
    })
});

module.exports = router;
