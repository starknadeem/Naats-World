const mongoose = require("mongoose");
const categoryModel = require("../models/categoryModel");

async function handlecategory(req, res) {
  try {
    const fetchCategory = await categoryModel.find({});
    if (fetchCategory) {
      return res.status(200).json({ message: fetchCategory });
    } else {
      res.status(404).json({ message: "No categories found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
}

module.exports = handlecategory;
