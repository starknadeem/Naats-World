const categoryModel = require("../models/categoryModel");
const artistModel = require("../models/artistModel");
const audioModel = require("../models/audioModel");

async function handleupload(req, res) {
  const { categoryName, artistName } = req.body;

  // Extract audio files and titles
  const audioFiles = req.files["audioFiles"];
  const audioTitles = req.body["audioTitles"];
  const artistimage = req.files["artistImage"][0].path;

  const existedCategory = await categoryModel.findOne({
    categoryName
  });

  if (existedCategory) {
    return res.status(400).json({ message: "category is already existed" });
  }

  const createdCategory = await categoryModel.create({
    categoryName,
  });

  const createdArtist = await artistModel.create({
    category: createdCategory._id,
    artistName,
    artistImage: artistimage,
  });



  if (audioFiles.length === 1) {
    const audioFilesData = audioFiles.map((file, index) => ({
      audioFile: file.path,
      audioTitle: audioTitles,
    }));

    const createdAudio = await audioModel.create({
      category: createdCategory._id,
      artistname: createdArtist._id, // Assuming artistname is the reference to Artist's ID
      audioFiles: audioFilesData,
    });
  } else {
    const audioFilesData = audioFiles.map((file, index) => ({
      audioFile: file.path,
      audioTitle: audioTitles[index],
    }));

    const createdAudio = await audioModel.create({
      category: createdCategory._id,
      artistname: createdArtist._id, // Assuming artistname is the reference to Artist's ID
      audioFiles: audioFilesData,
    });
  }

  res.json({ message: "Upload successful" });
}

module.exports = handleupload;