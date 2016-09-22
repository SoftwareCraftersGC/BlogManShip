'use strict';

require('chai').should();
let mongo = require('mongodb');

let MongoRepository = require('../src/infrastructure/mongoRepository');

describe('post repository', () => {
    const fakeMongoUrl = 'mongodb://localhost:27017/blog';
    const repository = new MongoRepository(fakeMongoUrl);

    afterEach((done) => {
        mongo.connect(fakeMongoUrl, (err, db) => {
            db.collection('posts').drop(() => {
                db.close();
                done();
            });
        });
    });

    describe('get Post ', () => {
        const postId = '56c8d54262a98d965a285f00';
        const postDTO = {
            'title' : 'Foo Bar Title',
            'content' : 'Foo Bar Content',
            'author' : 'Foo Bar Author',
            'date': '1460570559324'
        };

        before((done) => {
            mongo.connect(fakeMongoUrl, (err, db) => {
                db.collection('posts').insert({
                    '_id' : new mongo.ObjectID(postId),
                    'title' : postDTO.title,
                    'content' : postDTO.content,
                    'author' : postDTO.author,
                    'date': postDTO.date
                }, () => {
                    db.close();
                    done();
                });
            });
        });

        it('should return a specific post when it exists on the repository', () => {
            return repository.getPost(postId).then((post) => {
                post.should.be.deep.equal(postDTO);
            });
        });

        it('should return an error when an id doesnt exist on the repository', () => {
            let notExistingId = '49d8d54262a98d965a285f00';
            return repository.getPost(notExistingId).then((post) => {
                post.should.be.deep.equal({});
            });
        });
    });

    describe('get All Posts', () => {

        before((done) => {
            mongo.connect(fakeMongoUrl, (err, db) => {
                db.collection('posts').insert([
                    {'title' : 'post 1'},
                    {'title' : 'post 2'},
                    {'title' : 'post 3'}
                ], () => {
                    db.close();
                    done();
                });
            });
        });

        it('should return the list of posts in the repository', () => {
            return repository.getAllPosts().then((posts) => {
                posts.length.should.be.equal(3);
            });
        });
    });

    describe('create Post', () => {

        const post  = {
            title: 'Foo Bar Title',
            content: 'Foo Bar Content',
            author: 'Foo Bar Author'
        };

        it('should create a post into the repository', () => {
            return repository.createPost(post).then(() => {
                mongo.connect(fakeMongoUrl, (err, db) => {
                    db.collection('posts').findOne((err, postDTO) => {
                        db.close();
                        postDTO.should.be.deep.equal(post);
                    });
                });
            });
        });


    });
});
