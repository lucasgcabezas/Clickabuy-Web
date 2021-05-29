
const Product = require('../models/ProductModel');

const respondFrontend = (res, response, error) => {
    res.json({
        success: !error ? true : false,
        response,
        error
    })
}

const errorBackend = "error 500 , avisar al  team backend";
const errorProductNotFound = "error: Product not found";

const productControllers = {
    addProduct: async (req, res) => {
        let response, error;
        try {
            let newProduct = new Product(req.body);
            await newProduct.save();
            response = await Product.find();
        } catch (err) {
            console.log(err);
            error = "error missing required fields ";
        }
        respondFrontend(res, response, error);
    },
    getAllProducts: async (req, res) => {
        let response, error;
        try {
            response = await Product.find();
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },
    getProductById: async (req, res) => {
        const id = req.params.id;
        let response, error;
        try {
            response = await Product.findById(id);
            response || (error = errorProductNotFound)
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },
    updateProduct: async (req, res) => {
        const id = req.params.id;
        let response, error;
        try {
            response = await Product.findByIdAndUpdate(id , req.body, { new: true });
            response || (error = errorProductNotFound);
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },
    deleteProduct: async (req, res) => {
        const id = req.params.id;
        let response, error;
        try {
            response = await Product.findByIdAndDelete(id);
            response || (error = errorProductNotFound);
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res,response,error);
    },
    getProductsFromStore: async (req, res) => {
        const id = req.params.id
        let response;
        let error;
        try {
            const productsFromStore = await Product.find({ storeId: id })
            response = productsFromStore
        } catch (error) {
            error = 'An error has occurred on the server, try later!'
        }
        res.json({ success: !error ? true : false, response, error })
    },
    getProductFromCartLS: async(req,res) => {
        let error,response;
        let {cartLS} = req.body;
        cartLS = JSON.parse(cartLS)
        try {
            response = await Promise.all(cartLS.map(async (item) => {
                let product = await Product.findById(item._id);
                let newItem = {
                    ...product.toObject(),
                    quantity: parseInt(item.quantity) > product.stock ? product.stock : parseInt(item.quantity)
                }
                return newItem
            }))
            if(!response) throw new Error("response is undefined")

        } catch (err) {
            console.log(err)
            error = `${err.name}: ${err.message}`
        }
        respondFrontend(res,response,error);
    }
}


module.exports = productControllers;
