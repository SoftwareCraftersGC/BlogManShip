'use strict';

function CreatePostAction(service) {

  return {
    execute : (postDTO, callback) => new Promise((resolve, reject) => {
        service.createPost(postDTO).then(() => {
            resolve();
        });
    })
  };
}

module.exports = CreatePostAction;
