const mongoose = require('mongoose');

const userChannelSchema = mongoose.Schema({
    channelName: {
        type: String,
    },

    channelLogo: {
        type: String,
    },

})


const Channel = mongoose.model('Channel', userChannelSchema);
module.exports = Channel;