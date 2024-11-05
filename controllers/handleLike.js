const audioModel = require('../models/audioModel');
const postModel = require('../models/PostModel');

async function handleReaction(req, res) {
    const { title, reaction } = req.params;

    if (!title || !reaction) {
        return res.status(400).json({ message: "Title and Reaction Required" });
    }

    // Check if the title exists in the audioModel
    const audioDoc = await audioModel.findOne({ 'audioFiles.audioTitle': title });
    
    if (!audioDoc) {
        return res.status(400).json({ message: "Please Enter Correct Title" });
    }

    // Find the specific audioFile within the audioDoc
    const audioFile = audioDoc.audioFiles.find(file => file.audioTitle === title);
    

    if (!audioFile) {
        return res.status(400).json({ message: "Audio file not found" });
    }

    // Find the corresponding post or create a new one
    let post = await postModel.findOne({ title: audioFile._id });
    if (!post) {
        post = new postModel({ title: audioFile._id, like: 0 });
    }

    if (reaction === 'like') {
        post.like += 1;
    } else if (reaction === 'dislike') {
        if (post.like > 0) {
            post.like -= 1;  // Decrement the like count if there's at least one like
        }
    } else {
        return res.status(400).json({ message: "Invalid Reaction Type" });
    }

    await post.save();
    return res.status(200).json({ message: post.like });
}

module.exports = handleReaction;
