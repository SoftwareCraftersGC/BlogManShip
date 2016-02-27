'use strict';

function GetAllPostsAction(repository) {

  return {
    execute : () => repository.getAllPosts()
  };
}

module.exports = GetAllPostsAction;
