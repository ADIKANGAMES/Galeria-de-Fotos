const { Schema, model } = require('mongoose');
const Photo = new Schema({
    title: String,
    description: String,
    imageURL: String,
    public_id: String,
    user:{
        type:String,
        required:true
    }
});

module.exports = model('Photo', Photo);
