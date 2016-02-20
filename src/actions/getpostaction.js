'use strict';

class GetPostAction {
  constructor(repository) {
    this._repository = repository;
  }

  execute(id) {
    return this._repository.getPost(id);
  }
}

module.exports = GetPostAction;
