'use strict';

let should = require('chai').should();
let sinon = require('sinon');

class GetAllPostsAction {
  constructor(service) {
    this._service = service;
  }

  execute() {
    return this._service.getAllPosts();
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
