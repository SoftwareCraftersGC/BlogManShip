'use strict';

function GetPostAction(repository) {

  return {
      execute : (id) => new Promise((resolve, reject) => {
          repository.getPost(id).then((post) => resolve(post))
          .catch();
      })
  };
}

module.exports = GetPostAction;
