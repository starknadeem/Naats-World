const categoryModel = require("../models/categoryModel");
const artistModel = require("../models/artistModel");
const audioModel = require("../models/audioModel");

async function handleuploadaudio(req, res) {
    try {
        const { categoryName, artistName, audioTitles } = req.body;
        const audioFiles = req.files["audioFiles"];

        const category = await categoryModel.findOne({ categoryName: { $regex: new RegExp(categoryName, 'i') } });
        if (!category) {
            return res.status(400).json({ message: "Category not found" });
        }

        const artist = await artistModel.findOne({ artistName: { $regex: new RegExp(artistName, 'i') } });
        if (!artist) {
            return res.status(404).json({ message: "Artist not found" });
        }

        const audioTitlesArray = Array.isArray(audioTitles) ? audioTitles : [audioTitles];

        let audioFilesData = [];
        for (let i = 0; i < audioFiles.length; i++) {
            let audioFilePath = audioFiles[i].path;
            let audioTitle = audioTitlesArray[i];

            const audioExists = await audioModel.findOne({ "audioFiles.audioTitle": { $regex: new RegExp(audioTitle, 'i')} });
            if (audioExists) {
                return res.status(400).json({ message: `Audio title '${audioTitle}' already exists` });
            }

            audioFilesData.push({
                audioFile: audioFilePath,
                audioTitle: audioTitle
            });
        }

        const existingAudioEntry = await audioModel.findOne({ artistname: artist._id });

        if (existingAudioEntry) {
            existingAudioEntry.audioFiles.push(...audioFilesData);
            await existingAudioEntry.save();
        } else {
            const newAudio = new audioModel({
                categoryName: category._id,
                artistname: artist._id,
                audioFiles: audioFilesData
            });
            await newAudio.save();
        }

        res.status(200).json({ message: "Audio uploaded successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = handleuploadaudio;