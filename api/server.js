const express = require('express');
const postsRouter = require("./posts/posts-router");
const server = express();
 
server.use(express.json())
server.use("posts", postsRouter);


module.exports = server;
