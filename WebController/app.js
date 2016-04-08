const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/../Web'));

const repository = require('../src/infrastructure/mongoRepository')('mongodb://localhost:12345/blog');

const getAllPostsAction = require('../src/actions/getallpostsaction')(repository);
const getPostAction = require('../src/actions/getpostaction')(repository);
const createPostAction = require('../src/actions/createpostaction')(repository);

app.get('/posts', (req, res) => getAllPostsAction.execute().then((posts) => res.send(posts)));
app.get('/posts/:id', (req, res) => getPostAction.execute(req.params.id).then((post) => res.send(post)));
app.post('/posts', (req, res) => createPostAction.execute(req.body.post).then((result) => res.send(result)));

app.listen(5000, () => console.log('Running server'));
