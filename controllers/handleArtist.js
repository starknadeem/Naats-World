const mongoose = require('mongoose');
const categoryModel = require('../models/categoryModel');
const artistModel = require('../models/artistModel');

async function getArtistsByCategoryName(req, res) {
    const categoryname = req.params.categoryname;
    try {
        const fetchCategory = await categoryModel.findOne({ categoryName: { $regex: new RegExp(categoryname, 'i') } });

        if (fetchCategory) {
            const artistname = fetchCategory._id; //hello
            // console.log("now ", artistname);
            const artists = await artistModel.find({category: artistname});
            // console.log("check", artists);
            res.status(200).json(artists);
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        console.error("Error fetching artists:", error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = getArtistsByCategoryName;
