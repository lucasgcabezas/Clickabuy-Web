const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({
    nameProduct:{type: String, required: true},
    productImg: {type: String, required: true},
    description:{type: String,required:true},
    price:{type: Number, required: true,min :10},
    storeId:{type: mongoose.Types.ObjectId ,ref:'store',required:true},
    stock: {type: Number ,required:true,min:1 }    
})

const Product = mongoose.model('product',productSchema);

module.exports = Product;