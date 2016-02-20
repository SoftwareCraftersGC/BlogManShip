'use strict';

let should = require('chai').should();
let sinon = require('sinon');

class GetAllPostsAction {
  constructor(repository) {
    this._repository = repository;
  }

  execute() {
    return this._repository.getAllPosts();
  }
}

class GetPostAction {
  constructor(repository) {
    this._repository = repository;
  }

  execute(id) {
    return this._repository.getPost(id);
  }
}

describe('getAllPostAction should return', () => {
  it('a list with all the posts available', () => {

    let getAllPosts = sinon.spy();
    let postRepository = {getAllPosts : getAllPosts};

    let action = new GetAllPostsAction(postRepository);
    action.execute();
    sinon.assert.calledOnce(getAllPosts);
  });
});

describe('getSinglePost should return', () => {
  it('a post given an specific id', () => {

    let getPost = sinon.spy();
    let postRepository = {getPost : getPost}

    let action = new GetPostAction(postRepository);
    action.execute('anyId');
    sinon.assert.calledWith(getPost, 'anyId');
  })
})
