const MongoClient = require('mongodb/lib/mongo_client');

const mongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://testuser:testpwd@cluster0.1wzbf.mongodb.net/MusicDB?retryWrites=true&w=majority"
//"mongodb+srv://test:test@cluster0.cbdyt.mongodb.net/ProductDB?retryWrites=true&w=majority";

//mongo "mongodb+srv://cluster0.1wzbf.mongodb.net/<dbname>" --username amrit20
//mongodb+srv://<username>:<password>@cluster0.1wzbf.mongodb.net/<dbname>?retryWrites=true&w=majority

const client = new MongoClient(uri, { useNewUrlParser: true});

var collection;
var myLibraryCollection;

module.exports = {
    connect:function(callback){
       MongoClient.connect(uri)
          .then(function(client){
              console.log("Connected to MongoDB : MusicDB");

              collection = client.db('MusicDB').collection('music_albums');
              myLibraryCollection = client.db('MusicDB').collection('my_library');

              return callback("OK");
          })
          .catch(function(err){
              console.log(err);
          })
    },

    getCollection : function(){
       return collection;
    },

    getMyLibraryCollection : function(){
        return myLibraryCollection;
    }

}