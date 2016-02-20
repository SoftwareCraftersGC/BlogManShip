'use strict';

let mongo = require('mongodb');

class MongoRepository {
  constructor(connection) {
    this._connection = connection;
  }

  getPost(id, callback) {
    let ObjectId = new mongo.ObjectID(id);
    mongo.connect(this._connection, (err, db) => {
        db.collection('posts').findOne({"_id": ObjectId}, (err, post) => {
          callback(this._exportPost(post));
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
