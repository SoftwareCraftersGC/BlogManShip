'use strict';

let mongo = require('mongodb');

class MongoRepository {
  constructor(uri) {
    this._uri = uri;
  }

  _executeOnDatabase(callback) {
    mongo.connect(this._uri, callback)
  }

  createPost(post) {
    return new Promise((resolve, reject) => {
      const insertPost = (err, db) => {
        db.collection('posts').insert(post, () => {
          db.close();
          resolve();
        });
      };
      this._executeOnDatabase(insertPost);
    });
  }

  getAllPosts() {
    return new Promise((resolve, reject) => {
      const findAllPosts = (err, db) => {
        db.collection('posts').find((err, cursor) => {
          cursor.toArray((err, posts) => {
            db.close();
            resolve(posts);
          });
        });
      };
      this._executeOnDatabase(findAllPosts);
    });
  }

  getPost(id) {
    let ObjectId = new mongo.ObjectID(id);
    return new Promise((resolve, reject) => {
      const findPost = (err, db) => {
        db.collection('posts').findOne({"_id": ObjectId}, (err, post) => {
          db.close();
          resolve(this._exportPost(post));
        });
      };
      this._executeOnDatabase(findPost);
    });
  }

  _exportPost (post) {
    if (!post) {
      return {};
    }
    return {
      'title': post.title,
      'content': post.content,
      'author': post.author
    }
  }
}

module.exports = MongoRepository;
