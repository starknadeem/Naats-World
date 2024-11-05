const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    artistName: {
        type: String,
        required: true,
    },
    artistImage: {
        type: String,
        required: true,
    },
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;