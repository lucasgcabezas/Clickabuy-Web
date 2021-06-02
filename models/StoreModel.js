const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    nameStore: { type: String, required: true },
    storeHero: { type: String },
    description: { type: String },
    category: { type: mongoose.Types.ObjectId, ref: 'category' },
    comments: [{ name: { type: String }, avatar: { type: String }, comment: { type: String, required: true }, userId: { type: mongoose.Types.ObjectId, ref: 'user', required: true }, default: 0 }],
    rate: [{ vote: { type: Number, default: 0 }, userId: { type: mongoose.Types.ObjectId, ref: 'user', required: true } }],
    usersRated: [String],
    owners: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    logoStore: { type: String, required: true },
})

const Store = mongoose.model('store', storeSchema);

module.exports = Store;
