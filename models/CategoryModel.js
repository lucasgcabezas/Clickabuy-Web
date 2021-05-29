const mongoose = require ('mongoose');

const categorySchema = new mongoose.Schema({
    nameCategory:{type: String, required: true},
    imageCategory: {type: String}
})

const Category = mongoose.model('category',categorySchema);

module.exports = Category;