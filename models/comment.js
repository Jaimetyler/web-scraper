const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
    // title: String,
    body: String
});

const Comment = ('Comment', CommentSchema);

module.exports = Comment;