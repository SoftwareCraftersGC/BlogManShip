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
  it('a list with all the posts avaiable', () => {

    let getAllPosts = sinon.spy();
    let postService = {getAllPosts : getAllPosts};

    let action = new GetAllPostsAction(postService);
    action.execute();
    sinon.assert.calledOnce(getAllPosts);
  });
});
