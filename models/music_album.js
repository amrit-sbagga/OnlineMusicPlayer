
module.exports = class MusicAlbum {
    constructor(name, description, price, genre, imgurl, quantity, id) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.genre = genre;
        this.quantity = quantity;
        this.imgurl = imgurl;
        this._id = id;
    }

}