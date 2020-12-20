

const MusicAlbum = require("../models/music_album");
const repo = require("../dbrepos/musicRepo");

exports.getAddAlbumForm = (req, res, next) => {
    res.render('add-music-album');
}

exports.getUpdateAlbumForm = (req, res, next) => {
    const id = req.query.id;
    console.log(id);
    repo.get(id, (result) => {
        console.log(result);
        res.render('update-music-alum', {product:result});
    })
   
}


exports.getListAlbumView = (req, res, next) => {
    repo.getAll((musicalbums)=>{
        console.log("Music Album Received");
        res.render('list-music-album', { title: 'Music...', musicalbums: musicalbums });
    })
    
}

exports.getMyMusicLibrary = (req, res, next) => {
    repo.getMyLibrary((musicalbums)=>{
        console.log("Music Album Received");
        res.render('my-music-library', { title: 'Music...', musicalbums: musicalbums });
    })
    
}


exports.addToMyLibrary = (req, res, next) => {
    var musicOj = JSON.parse(req.body.music);
    console.log("addToMyLibrary req body = ", musicOj);

    if(musicOj.quantity <= 0){
       // req.flash("error", "Not enough quantity to purchase!!");
       // req.flash('info', 'Not enough quantity for purchase!!');

       // res.send(req.flash("error"));

        repo.getAllPlusError(musicOj._id, (musicalbums)=>{
            console.log("Music Album Received");
           // res.render('list-music-album', { title: 'Music...', musicalbums: musicalbums, error:req.flash("error") });
            res.render('list-music-album', { title: 'Music Albums', musicalbums: musicalbums });
        })
        return;
    }else{
       // productCollection.push(req.body);
        const musicalbum = new MusicAlbum(musicOj.name, musicOj.description, musicOj.price, musicOj.genre, musicOj.imgurl);
        repo.addToMyLibrary(musicalbum);

        repo.reduceQuantityFromGallery(musicOj._id, musicOj.quantity);
        
        repo.getMyLibrary((musicalbums)=>{
            console.log("Music Album Received");
            res.render('my-music-library', { title: 'My Music Gallery', musicalbums: musicalbums });
        })
    }
    
}


exports.deleteAlbumFromMyLibrary = (req, res, next) => {
    console.log("deleteAlbumFromMyLibrary req body = ", req.body);

    const id = req.body.music_id;
    console.log("deleteAlbumFromMyLibrary id = ", id);
  
    repo.delete(id, () => {
        repo.getMyLibrary((musicalbums)=>{
            console.log("musicalbums Received after delete");
            res.redirect('/music/mylibrary');
            //res.render('my-music-library', { title: 'musicalbum...', musicalbums: musicalbums });
        })
    })
}