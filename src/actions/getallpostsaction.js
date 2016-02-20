'use strict';

class GetAllPostsAction {
  constructor(repository) {
    this._repository = repository;
  }

  execute() {
    return this._repository.getAllPosts();
  }
}

module.exports = GetAllPostsAction;
