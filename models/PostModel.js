const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
        title: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Audio',
            required: true,
        },

        like: {
            type: Number,
            default: 0,
        },
})

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;