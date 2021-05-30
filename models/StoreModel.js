const mongoose = require ('mongoose');

const storeSchema = new mongoose.Schema({
    nameStore:{type: String, required: true},
    storeImg:{type: String, required: true},
    description:{type: String ,required: true},
    categories: {type: mongoose.Types.ObjectId ,ref:'category'},
    comments:[{name:{type:String}, avatar:{type:String}, comment:{type:String, required: true}, userId:{type: mongoose.Types.ObjectId, ref: 'user', required:true}, default: 0}],
    rate: [{vote: {type: Number, required: true}, userId:{type: mongoose.Types.ObjectId, ref: 'user', required:true}, default: 0}],
    owners: [{type: mongoose.Types.ObjectId ,ref:'store'}], 
})

const Store = mongoose.model('store',storeSchema);

module.exports = Store;
