const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    password:{type: String, required: true},
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    userImg:{type: String, required: true},
    role : {type:String,default:"commonUser"}, //roles: commonUser,adminStores,adminApp
    productsLiked: [{type:String}],
    email:{type: String, required: true},
    loggedWithGoogle: {type: Boolean , default: false},
    storesRated: [String] 
})

const User = mongoose.model('user',userSchema);

module.exports = User;