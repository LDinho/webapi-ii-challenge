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

   findById(id)
     .then((post) => {
       if (post.length) {

         remove(id).then(()=> {
           res.status(200).json(post);
         }).catch(() => {
             res.status(500).json({ error: "The post could not be removed" });
           })
       } else {
         res.status(404)
           .json({ message: "The post with the specified ID does not exist." });
       }
     })
     .catch(() => {
       res.status(500).json({ error: "The post could not be removed" });
     })

});

// router.delete('/:id', (req, res) => {
//   const { id } = req.params;
//
//  // This code works with the async remove function commented out in db.js @line 39
//
//   remove(id)
//     .then((post) => {
//       console.log('POST:', post);
//       if (post.length) {
//
//         res.status(200).json(post);
//       } else {
//         res.status(404)
//           .json({ message: "The post with the specified ID does not exist." });
//       }
//     })
//     .catch(() => {
//       res.status(500).json({ error: "The post could not be removed" });
//     })
// });

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedPost = req.body;

  const { title, contents } = updatedPost;

  if (!title || !contents) {
    return res.status(400)
      .json({ errorMessage: "Please provide title and contents for the post."   });
  }

  update(id, updatedPost )
    .then((post) => {
      console.log("UPDATE POST", post);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404)
          .json({
            message: "The post with the specified ID does not exist."
          });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "The post information could not be modified."
      });
    })
});

module.exports = router;
