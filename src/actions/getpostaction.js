'use strict';

function GetPostAction(repository) {

  return {
      execute : (id) => repository.getPost(id)
  };
}

module.exports = GetPostAction;
