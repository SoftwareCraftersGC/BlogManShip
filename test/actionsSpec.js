'use strict';

let sinon = require('sinon');

let GetAllPostsAction = require('../src/actions/getallpostsaction');
let CreatePostAction = require('../src/actions/createpostaction');
let GetPostAction = require('../src/actions/getpostaction');

describe('getAllPostAction should return', () => {
    it('a list with all the posts available', (done) => {

        let getAllPosts = sinon.spy();
        let postRepository = {
            getAllPosts : () => new Promise((resolve, reject) => {
                getAllPosts();
                resolve();
            })
        };

        let action = GetAllPostsAction(postRepository);
        action.execute().then(() => {
            sinon.assert.calledOnce(getAllPosts);
            done();
        });
    });
});

describe('getSinglePost should return', () => {
    it('a post given an specific id', (done) => {
        const postId = 'anyId';
        let getPost = sinon.spy();
        let postRepository = {getPost : (id) => new Promise((resolve, reject) => {
            getPost(id);
            resolve();
        })};

        let action = new GetPostAction(postRepository);
        action.execute(postId).then(() => {
            sinon.assert.calledWith(getPost, postId);
            done();
        });
    });
});

describe('createPost should', (done) => {
    it('call postService.createPost', () => {

        let createPost = sinon.spy();
        let postService = {createPost : (postDTO) => new Promise((resolve, reject) => {
            createPost(postDTO);
            resolve();
        })}
        let action = new CreatePostAction(postService);
        let postDTO = {
            'title' : 'Foo Bar Title',
            'content' : 'Foo Bar Content',
            'author' : 'Foo Bar Author'
        };
        action.execute(postDTO).then(() => {
            sinon.assert.calledWith(createPost, postDTO);
            done();
        });
    });
});
