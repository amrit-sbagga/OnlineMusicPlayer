const express = require("express");
// const path = require("path");

const router = express.Router();

const musicController = require("../controllers/music_album");

router.get('/add', musicController.getAddAlbumForm);

router.get('/update', musicController.getUpdateAlbumForm);

//router.post('/update', musicController.updateAlbum);

router.post('/delete', musicController.deleteAlbumFromMyLibrary);

router.get('/view', musicController.getListAlbumView);

//router.post('/add', musicController.addMusicAlbum);

router.get('/mylibrary', musicController.getMyMusicLibrary);

// router.get('/purchase', musicController.purchaseAlbum);

router.post('/mylibrary', musicController.addToMyLibrary)

module.exports = router;