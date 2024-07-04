const categoryModel = require("../models/categoryModel");
const artistModel = require("../models/artistModel");
const audioModel = require("../models/audioModel");

async function handlefun(req, res) {
  const { categoryName, artistName } = req.body;
  const audioFiles = req.files["audioFiles"];
  const audioTitles = req.body["audioTitles"];
  const artistimage = req.files["artistImage"][0].path;

  const categorynamefound = await categoryModel.findOne({categoryName: { $regex: new RegExp(categoryName, 'i')}});
  // console.log("ID IS ", categorynamefound._id)
  if(categorynamefound)
    {
      const audioExists = await audioModel.findOne({ "audioFiles.audioTitle": { $regex: new RegExp(audioTitles, 'i')} });

      if (audioExists) {
          return res.status(400).json({ message: `Audio title '${audioTitles}' already exists` });
      }
      
        const createdArtist = await artistModel.create({
            category: categorynamefound._id,
            artistName: artistName,
            artistImage: artistimage,
          });

          if (audioFiles.length === 1) {
            const audioFilesData = audioFiles.map((file, index) => ({
              audioFile: file.path,
              audioTitle: audioTitles,
            }));
        
            const createdAudio = await audioModel.create({
              category: categorynamefound._id,
              artistname: createdArtist._id, // Assuming artistname is the reference to Artist's ID
              audioFiles: audioFilesData,
            });
          } else {
            const audioFilesData = audioFiles.map((file, index) => ({
              audioFile: file.path,
              audioTitle: audioTitles[index],
            }));
        
            const createdAudio = await audioModel.create({
              category: categorynamefound._id,
              artistname: createdArtist._id, // Assuming artistname is the reference to Artist's ID
              audioFiles: audioFilesData,
            });
          }
          res.status(200).json({message: "work done"});
    }


    else{
        res.status(404).json({message: "Category not found"});
    }
  }


module.exports = handlefun;
