'use strict';

let should = require('chai').should();
let mongo = require('mongodb');

let MongoRepository = require('../src/infrastructure/mongoRepository');

describe('post repository', () => {
  describe('get post', () => {
    const fakeMongoUrl = 'mongodb://localhost:12345/blog';
    const postId = '56c8d54262a98d965a285f00';
    const postDTO = {
      'title' : 'Foo Bar Title',
      'content' : 'Foo Bar Content',
      'author' : 'Foo Bar Author'
    };

    let repository;

    before((done) => {
      mongo.connect(fakeMongoUrl, (err, db) => {
          db.collection('posts').insert({
            '_id' : postId,
            'title' : postDTO.title,
            'content' : postDTO.content,
            'author' : postDTO.author
          }, done);
      });
    });

    after((done) => {
      mongo.connect(fakeMongoUrl, (err, db) => {
          db.collection('posts').remove({'_id' : postId}, done);
      });
    })

    beforeEach(() => {
      repository = new MongoRepository(fakeMongoUrl);
    })

    it('should return a specific post when it exists on the repository', (done) => {
      repository.getPost(postId).then((post) => {
          post.should.be.deep.equal(postDTO)
          done();
      });
    });

    it('should return an error when an id doesnt exist on the repository', (done) => {
      let notExistingId = '49d8d54262a98d965a285f00';
      repository.getPost(notExistingId).then((post) => {
        post.should.be.deep.equal({});
        done();
      });
    });
  });

});
