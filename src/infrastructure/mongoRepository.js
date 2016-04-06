'use strict';

let mongo = require('mongodb');

function MongoRepository(uri) {

    function executeOnDatabase(callback) {
        mongo.connect(uri, callback);
    }

    function createPost(post) {
        return new Promise((resolve) => {
            const insertPost = (err, db) => {
                db.collection('posts').insert(post, () => {
                    db.close();
                    resolve();
                });
            };
            executeOnDatabase(insertPost);
        });
    }

    function getAllPosts() {
        return new Promise((resolve) => {
            const findAllPosts = (err, db) => {
                db.collection('posts').find((err, cursor) => {
                    cursor.toArray((err, posts) => {
                        db.close();
                        resolve(posts);
                    });
                });
            };
            executeOnDatabase(findAllPosts);
        });
    }

    function getPost(id) {
        let ObjectId = new mongo.ObjectID(id);
        return new Promise((resolve) => {
            const findPost = (err, db) => {
                db.collection('posts').findOne({'_id': ObjectId}, (err, post) => {
                    db.close();
                    resolve(exportPost(post));
                });
            };
            executeOnDatabase(findPost);
        });
    }

    function exportPost (post) {
        if (!post) {
            return {};
        }
        return {
            'title': post.title,
            'content': post.content,
            'author': post.author
        };
    }

    return {
        createPost : createPost,
        getAllPosts: getAllPosts,
        getPost: getPost
    };
}

module.exports = MongoRepository;
