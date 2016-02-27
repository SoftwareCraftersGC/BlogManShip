'use strict';

function CreatePostAction(service) {

  return {
    execute : (postDTO) => service.createPost(postDTO)
  };
}

module.exports = CreatePostAction;
