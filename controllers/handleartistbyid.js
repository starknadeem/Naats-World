const mongoose = require('mongoose');
const categoryModel = require('../models/categoryModel');
const artistModel = require('../models/artistModel');

async function handleartistbyid(req, res) {
    const artistid = req.params.id;
    try {

        if (artistid) {
            const artists = await artistModel.find({_id: artistid});
            res.status(200).json(artists);
        } else {
            res.status(404).json({ message: "artistid not found" });
        }
    } catch (error) {
        console.error("Error fetching artists:", error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = handleartistbyid;