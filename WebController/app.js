const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
const node_env = process.env.NODE_ENV;
const mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:12345/blog';

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/../Web'));

const repository = require('../Business/src/infrastructure/mongoRepository')(mongoUri);

const getAllPostsAction = require('../Business/src/actions/getallpostsaction')(repository);
const getPostAction = require('../Business/src/actions/getpostaction')(repository);
const createPostAction = require('../Business/src/actions/createpostaction')(repository);

app.get('/posts', (req, res) => getAllPostsAction.execute().then((posts) => res.send(posts)));
app.get('/posts/:id', (req, res) => getPostAction.execute(req.params.id).then((post) => res.send(post)));
app.post('/posts', (req, res) => createPostAction.execute(req.body.post).then((result) => res.send(result)));

app.listen(port, () => {
    console.log('Web is running with port: ' + port + ' in ' + node_env + ' mode.');
});
