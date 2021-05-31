const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({
    nameProduct:{type: String, required: true},
    productImg: {type: String, required: true},
    description:{type: String},
    price:{type: Number, required: true},
    storeId:{type: mongoose.Types.ObjectId ,ref:'store'},
    stock: {type: Number ,default: 0}   
})

const Product = mongoose.model('product',productSchema);

module.exports = Product;