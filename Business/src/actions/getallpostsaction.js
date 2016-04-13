'use strict';

function GetAllPostsAction(repository) {

  return {
    execute : () => new Promise((resolve, reject) => {
        repository.getAllPosts().then((posts) => {
            resolve(posts.sort((post1, post2) => post1.date < post2.date));
        })
        .catch((err) => reject(err));
    })
  };
}

module.exports = GetAllPostsAction;
