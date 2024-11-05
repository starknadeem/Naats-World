const artistModel = require('../models/artistModel');
const audioModel = require('../models/audioModel');

async function handleaudio(req, res)
{
    const ArtistName = req.params.artistname;
    const result = await artistModel.findOne({artistName: { $regex: new RegExp(ArtistName, 'i' )}});
    if(result == "" || result == null)
        {
            return res.status(404).json({message: "Data Not Found"});
        }

        //console.log("okay ", result);
    if(result)
        {
            const artist_id = result._id;
            const finalResult = await audioModel.find({artistname: artist_id});
            return res.json(finalResult);
        }
        else{
            res.status(404).json({message: "Not Found"})
        }
}

module.exports = handleaudio;