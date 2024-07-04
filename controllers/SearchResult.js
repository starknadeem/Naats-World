const Audio = require('../models/audioModel');

async function SearchResult(req, res) {
  const query = req.query.query;

  // Handle empty query
  if (!query) {
    return res.status(400).json({ error: "Please provide a search query" });
  }

  try {
    const results = await Audio.find({
      'audioFiles.audioTitle': { $regex: query, $options: 'i' }
    }).populate('category artistname');

    // Handle no results found
    if (results.length === 0) {
      return res.status(404).json({ message: "No audio files found for the given query" });
    }

    // Format results
    const formattedResults = results.flatMap(audio => 
      audio.audioFiles.filter(file => file.audioTitle.toLowerCase().includes(query.toLowerCase()))
    );

    res.json(formattedResults);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).send('Error fetching search results: ' + error.message);
  }
}

module.exports = SearchResult;