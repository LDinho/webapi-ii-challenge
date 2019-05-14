const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find() {
  return db('posts');
}

function findById(id) {
  return db('posts').where({ id: Number(id) });
}

function insert(post) {
  return db('posts')
    .insert(post)
    .then(ids => ({ id: ids[0] }));
}

async function update(id, post) {
  await db('posts')
    .where('id', Number(id))
    .update(post);

  return findById(Number(id));
}

function remove(id) {
  return db('posts')
    .where('id', Number(id))
    .del();
}

// async function remove(id) {
//
//   try {
//     const post = await findById(Number(id));
//
//     await db('posts')
//       .where('id', Number(id))
//       .del();
//
//     return post;
//
//   } catch (e) {
//     return Promise.reject(new Error(e))
//   }
// }
