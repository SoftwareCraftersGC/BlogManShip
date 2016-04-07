'use strict';

function GetAllPostsAction(repository) {

  return {
    execute : () => new Promise((resolve, reject) => {
        repository.getAllPosts().then((posts) =>resolve(posts))
        .catch();
    })
  };
}

module.exports = GetAllPostsAction;
