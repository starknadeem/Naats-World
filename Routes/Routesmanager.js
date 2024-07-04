const express = require('express');
const router = express.Router();

//file Imports
const handleupload = require('../controllers/handleupload')
const upload = require('../middleware/multermiddleware');
const handlecategory = require('../controllers/handlecategory');
const handleArtist = require('../controllers/handleArtist');
const handleartistbyid =  require('../controllers/handleartistbyid');
const handlefun = require('../controllers/handlefun');
const handleaudio = require('../controllers/handleaudio');
const handleuploadaudio = require('../controllers/handleuploadaudio');
const handleaudiotwo = require('../controllers/handleaudiotwo');
const handleAllAudio = require('../controllers/handleAllAudio');
const registerUser = require('../controllers/Registeruser');
const SearchResult = require('../controllers/SearchResult');

router.post("/upload", upload.fields([
    {  name: 'artistImage' },
    { name: 'audioFiles'}
]), handleupload);

router.post("/upload/artist", upload.fields([
    {  name: 'artistImage' },
    { name: 'audioFiles'}
]), handlefun);

router.post("/upload/audio", upload.fields([
    { name: 'audioFiles'}
]), handleuploadaudio);

router.post("/registeruser",registerUser);

router.get("/getcategory", handlecategory);
router.get("/getartist/:categoryname", handleArtist);
router.get("/getartistbyID/:id", handleartistbyid);
router.get("/getaudio/:artistname", handleaudio);
router.get("/audio/:artistid", handleaudiotwo);
router.get("/allaudio/:category", handleAllAudio);
router.get("/search",SearchResult);


module.exports = router;