const mongoose = require('mongoose');

const audioSchema = mongoose.Schema({

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },

    artistname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    
    audioFiles: [{
        audioFile: {
            type: String,
            unique: true,
            required: [true, 'Audio file path is required'],
        },
        audioTitle: {
            type: String,
            unique: true,
            required: [true, 'Audio title is required'],
        }
    }]

});

const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;