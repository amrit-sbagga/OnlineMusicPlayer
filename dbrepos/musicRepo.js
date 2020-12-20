//const collection = require('../configjs/mongodb').getCollection();

const db = require('../configjs/mongodb');
var ObjectId = require('mongodb').ObjectID;

exports.add = (music, callback) =>{
   const collection = db.getCollection();
   collection.insertOne({
       name: music.name,
       description: music.description,
       price: music.price,
       genre: music.genre,
       quantity:music.quantity
   }).then(() => {
       console.log("Document Inserted.");
       callback("OK");
   })
}

exports.getAll = (callback) => {
    const collection = db.getCollection();
    collection.find().toArray()
      .then((music)=>{
         //console.log(music);
         return callback(music);
    })
}

exports.getAllPlusError = (id, callback) => {
    console.log("Received id = ", id);
    const collection = db.getCollection();
    collection.find().toArray()
      .then((music)=>{
          for(let idx=0; idx<music.length; idx++){
              console.log("idx id here = ", music[idx]._id);
              if(id == music[idx]._id){
                music[idx]["id_error"] = "Not enough quantity to purchase!!"
              }
          }
                
         //console.log(music);
         return callback(music);
    })
}

exports.addToMyLibrary = (music, callback) =>{
    console.log("repo addToMyLibrary music obj here = ", music);
    const collection = db.getMyLibraryCollection();
    collection.insertOne({
        name: music.name,
        description: music.description,
        price: music.price,
        genre: music.genre,
        quantity:music.quantity,
        imgurl: music.imgurl
    }).then(() => {
        console.log("Document Inserted.");
        callback("OK");
    })
 }

 exports.reduceQuantityFromGallery = (id, quantity, callback) =>{
    console.log("repo reduceQuantityFromGallery music id here = ", id);
    console.log("repo reduceQuantityFromGallery music quantity here = ", quantity);
    const collection = db.getCollection();
    collection.findOneAndUpdate({_id : ObjectId(id)}, {
        $set : {
            quantity: quantity - 1
        }
    }).then(()=>{
         console.log("Document quantity updated.");
         return callback("OK");
    })
 }

exports.getMyLibrary = (callback) => {
    const collection = db.getMyLibraryCollection();
    collection.find().toArray()
      .then((music)=>{
         //console.log(music);
         return callback(music);
    })
}

exports.get = (id, callback) => {
    const collection = db.getCollection();
    collection.findOne({_id : ObjectId(id)})
      .then((music)=>{
         console.log(music);
         return callback(music);
    })
}

exports.update = (music, callback) => {
    const collection = db.getCollection();
    collection.findOneAndUpdate({_id : ObjectId(music._id)}, {
        $set : {
            name: music.name,
            description: music.description,
            price: music.price,
            quantity: music.quantity
        }
    }).then(()=>{
         console.log("Document updated.");
         return callback("OK");
    })
}

exports.delete = (id, callback) => {
    const collection = db.getMyLibraryCollection();
    collection.deleteOne({_id : ObjectId(id)})
      .then(()=>{
         console.log("Document deleted.");
         return callback("OK");
    })
}