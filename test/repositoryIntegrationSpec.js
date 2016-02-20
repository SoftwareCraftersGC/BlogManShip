'use strict';

let should = require('chai').should();

let MongoRepository = require('../src/infrastructure/mongoRepository');

describe('post repository should', () => {
  let fakeMongoUrl;
  let repository;

  beforeEach(() => {
    fakeMongoUrl = 'mongodb://localhost:12345/blog';
    repository = new MongoRepository(fakeMongoUrl);
  })

  it('return a specific post when getPost is called', (done) => {
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

  it('return an error when an id doesnt exist on the repository', (done) => {
    let notExistingId = '49d8d54262a98d965a285f00';
    repository.getPost(notExistingId, (post) => {
      post.should.be.deep.equal({});
      done();
    });
  });
});
