'use strict';

let sinon = require('sinon');

require('chai').should();

let GetAllPostsAction = require('../src/actions/getallpostsaction');
let CreatePostAction = require('../src/actions/createpostaction');
let GetPostAction = require('../src/actions/getpostaction');
let GetLastPostsAction = require('../src/actions/GetLastPostsAction');

const DAY_IN_MILLISECONDS = 24 * 3600 * 1000;

describe('getAllPostAction should return', () => {
    it('a list with all the posts available', () => {

        const postOneDate = new Date().getTime();
        const postTwoDate = new Date().getTime() + DAY_IN_MILLISECONDS;

        const expectedPosts = [
            createPost('AnyTitle', 'AnyContent', 'AnyAuthor', postOneDate),
            createPost('AnyTitle', 'AnyContent', 'AnyAuthor', postTwoDate)
        ];

        let getAllPosts = sinon.spy();
        let postRepository = {
            getAllPosts : () => new Promise((resolve) => {
                getAllPosts();
                resolve(expectedPosts.slice(0));
            })
        };

        let action = GetAllPostsAction(postRepository);
        return action.execute().then((posts) => {
            sinon.assert.calledOnce(getAllPosts);
            posts[0].should.be.deep.equal(expectedPosts[1]);
            posts[1].should.be.deep.equal(expectedPosts[0]);
        });
    });
});

describe('getSinglePost should return', () => {
    it('a post given an specific id', () => {
        const postId = 'anyId';
        let getPost = sinon.spy();
        let postRepository = {getPost : (id) => new Promise((resolve) => {
            getPost(id);
            resolve();
        })};

        let action = GetPostAction(postRepository);
        return action.execute(postId).then(() => {
            sinon.assert.calledWith(getPost, postId);
        });
    });
});

describe('createPost should', () => {
    it('call postService.createPost', () => {

        let createPost = sinon.spy();
        let postService = {createPost : (postDTO) => new Promise((resolve) => {
            createPost(postDTO);
            resolve();
        })};
        let action = CreatePostAction(postService);
        let postDTO = createPost('AnyTitle', 'AnyContent', 'AnyAuthor');
        return action.execute(postDTO).then(() => {
            sinon.assert.calledWith(createPost, postDTO);
        });
    });
});

describe('getLastPosts should', () => {
    it('call repository.getLastPosts', () => {
        let getLastPosts = sinon.spy();
        let repository = {getLastPosts : () => new Promise((resolve) => {
            getLastPosts();
            resolve();
        })};

        let action = GetLastPostsAction(repository);
        return action.execute().then(() => {
            sinon.assert.calledOnce(getLastPosts);
        });
    });
});

function createPost(title, content, author, date) {
    return {
        title : title,
        content : content,
        author : author,
        date : date
    };
}
