'use strict';

let mongo = require('mongodb');

class MongoRepository {
  constructor(connection) {
    this._connection = connection;
  }

  getAllPosts() {
    return new Promise((resolve, reject) => {
      mongo.connect(this._connection, (err, db) => {
        db.collection('posts').find((err, cursor) => {
          cursor.toArray((err, posts) => {
            db.close();
            resolve(posts);
          });
        });
      });
    });
  }

  getPost(id) {
    let ObjectId = new mongo.ObjectID(id);
    return new Promise((resolve, reject) => {
      mongo.connect(this._connection, (err, db) => {
        db.collection('posts').findOne({"_id": ObjectId}, (err, post) => {
          db.close();
          resolve(this._exportPost(post));
        });
      });
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
