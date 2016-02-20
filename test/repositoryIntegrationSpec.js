'use strict';

let should = require('chai').should();
let mongo = require('mongodb');

class MongoRepository {
  constructor(connection) {
    this._connection = connection;
  }

  getPost(id, callback) {
    let ObjectId = new mongo.ObjectID(id);
    mongo.connect(this._connection, (err, db) => {
        db.collection('posts').findOne({"_id": ObjectId}, (err, post) => {
          callback({
            'title': post.title,
            'content': post.content,
            'author': post.author
          });
        });
      });
    }
}

describe('post repository should', () => {
  it('return a specific post when getPost is called', (done) => {
    let repository = new MongoRepository("mongodb://localhost:12345/blog");
    let postId = '56c8d54262a98d965a285f00';
    let postDTO = {
      'title' : 'Foo Bar Title',
      'content' : 'Foo Bar Content',
      'author' : 'Foo Bar Author'
    };
    repository.getPost(postId, (post) => {
      post.should.be.deep.equal(postDTO);
      done();
    });
  });
});
