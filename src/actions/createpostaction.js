'use strict';

class CreatePostAction {
  constructor(service) {
    this._service = service;
  }

  execute(postDTO) {
    return this._service.createPost(postDTO);
  }
}

module.exports = CreatePostAction;
