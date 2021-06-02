const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({
    nameProduct:{type: String, required: true},
    productImg: {type: String, required: true},
    description:{type: String,required:true},
    price:{type: Number, required: true,min :10},
    storeId:{type: mongoose.Types.ObjectId ,ref:'store',required:true},
    stock: {type: Number ,required:true,min:1 } ,
    usersRatedProduct: [String],   
    rateProduct: [{ vote: { type: Number, default: 0 }, userId: { type: mongoose.Types.ObjectId, ref: 'user', required: true } }],

})

const Product = mongoose.model('product',productSchema);

module.exports = Product;