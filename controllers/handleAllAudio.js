const audioModel = require("../models/audioModel");
const categoryModel = require("../models/categoryModel");

async function handleAllAudio(req, res) {

    const categoryname = req.params.category;
    if (categoryname) {
        let fetchedCategory = "";
        switch (categoryname) {
            case 'naats':
                fetchedCategory = await categoryModel.findOne({ categoryName: { $regex: new RegExp('Naat Khawan', 'i') } });

                if (!fetchedCategory || fetchedCategory == '' || fetchedCategory == null) {
                    res.status(404).json({ message: "Category is Not found You have to create a Naats or NaatKhawan Category First" });
                }
                else {
                    const audio = await audioModel.find({ category: fetchedCategory._id });
                    if (!audio || audio == '' || audio == null) {
                        res.status(404).json({ message: "Audios Not found. Please Upload some Naats in Naat or Naat Khawna Category" });
                    }
                    else {
                        res.status(200).json(audio);
                    }
                }
                break;


            case "noha":
                fetchedCategory = await categoryModel.findOne({ categoryName: { $regex: new RegExp('nohas', 'i') } });

                if (!fetchedCategory || fetchedCategory == '' || fetchedCategory == null) {
                    res.status(404).json({ message: "Category is Not found You have to create NOHAS Category First" });
                }
                else {
                    const audio = await audioModel.find({ category: fetchedCategory._id });
                    if (!audio || audio == '' || audio == null) {
                        res.status(404).json({ message: "Audios Not found. Please Upload some Naats in Naat or Naat Khawna Category" });
                    }
                    else {
                        res.status(200).json(audio);
                    }
                }
                break;

            case "tilawat":
                fetchedCategory = await categoryModel.findOne({ categoryName: { $regex: new RegExp('Tilwat e Quran', 'i') } });

                if (!fetchedCategory || fetchedCategory == '' || fetchedCategory == null) {
                    res.status(404).json({ message: "Category is Not found You have to create a Tilwat e Quran Category First" });
                }
                else {
                    const audio = await audioModel.find({ category: fetchedCategory._id });
                    if (!audio || audio == '' || audio == null) {
                        res.status(404).json({ message: "Audios Not found. Please Upload some Naats in Naat or Naat Khawna Category" });
                    }
                    else {
                        res.status(200).json(audio);
                    }
                }
                break;



            case "bayan":
                fetchedCategory = await categoryModel.findOne({ categoryName: { $regex: new RegExp('bayans', 'i') } });

                if (!fetchedCategory || fetchedCategory == '' || fetchedCategory == null) {
                    res.status(404).json({ message: "Category is Not found You have to create BAYANS Category First" });
                }
                else {
                    const audio = await audioModel.find({ category: fetchedCategory._id });
                    if (!audio || audio == '' || audio == null) {
                        res.status(404).json({ message: "Audios Not found. Please Upload some Naats in Naat or Naat Khawna Category" });
                    }
                    else {
                        res.status(200).json(audio);
                    }
                }
                break;


            default:
                res.status(404).json({ message: "Invalid CategoryName" })
                break;
        }
    }

    else {
        res.status(400).json({ message: "category name is required" });
    }
}

module.exports = handleAllAudio;