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

class CreatePostAction {
  constructor(service) {
    this._service = service;
  }

  execute(postDTO) {
    return this._service.createPost(postDTO);
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

describe('createPost should', () => {
  it('call postService.createPost', () => {

    let createPost = sinon.spy();
    let postService = {createPost : createPost};

    let action = new CreatePostAction(postService);
    let postDTO = {
      'title' : 'Foo Bar Title',
      'content' : 'Foo Bar Content',
      'author' : 'Foo Bar Author',
    };
    action.execute(postDTO);
    sinon.assert.calledOnce(createPost);
  })
})
