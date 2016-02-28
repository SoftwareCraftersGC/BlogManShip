const express = require('express');
const app = express();

const repository = require('../src/infrastructure/mongoRepository')('mongodb://localhost:12345/blog');

const getAllPostsAction = require('../src/actions/getallpostsaction')(repository);
const getPostAction = require('../src/actions/getpostaction')(repository);
const createPostAction = require('../src/actions/createpostaction')(repository);

app.get('/hello', (req, res) => res.send('hello world'));
app.get('/posts', (req, res) => res.send(getAllPostsAction.execute()));
app.get('/posts/:id', (req, res) => res.send(getPostAction.execute(req.params.id)));
app.post('/posts', (req, res) => res.send(createPostAction.execute(req.body.post)));


app.listen(5000, () => console.log('Running server'));
