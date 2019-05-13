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

router.post('/', (req, res) => {
  const newPost = req.body;
  console.log('req body', req.body);

  const { title, contents} = newPost;

  if (!title || !contents) {
    return res.status(400)
      .json({ errorMessage: "Please provide title and contents for the post."   });
  }

  insert(newPost)
    .then((newPost) => {
      res.status(201).json(newPost);
    })
    .catch(() => {
      res.status(500)
        .json({ error: "There was an error while saving the post to the database" });
    })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  remove(id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The post could not be removed" });
    })
});

module.exports = router;
