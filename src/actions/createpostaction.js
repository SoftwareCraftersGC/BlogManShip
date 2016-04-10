'use strict';

function CreatePostAction(service) {

  return {
    execute : (postDTO) => new Promise((resolve, reject) => {
        service.createPost(postDTO).then((result) => {
            resolve(result);
        }).catch((err) => reject(err));
    })
  };
}

module.exports = CreatePostAction;
