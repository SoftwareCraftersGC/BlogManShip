function GetLastPostsAction(repository) {
    const _repository = repository;

    function execute()  {
        return new Promise((resolve) => {
            _repository.getLastPosts().then((posts) => {
                resolve(posts);
            });
        });
    }

    return {
        execute
    };
}

module.exports = GetLastPostsAction;
