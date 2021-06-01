
const Product = require('../models/ProductModel');
const StoreModel = require('../models/StoreModel');

const respondFrontend = (res, response, error) => {
    res.json({
        success: !error ? true : false,
        response,
        error
    })
}

const errorBackend = "error 500 , avisar al  team backend";
const errorProductNotFound = "error: Product not found";

const validationStore = async  (idStore,user) => {
    const store = await StoreModel.findById(idStore);
    if (!store) throw new Error("this Store doesn't exist")

    userExist = store.owners.find(idUser => idUser.toString() === user._id.toString())
    if (!userExist) throw new Error("this user is not Authorizated to modify the Store "+ store.nameStore)

    return store
}


const productControllers = {
    addProduct: async (req, res) => {
        let response, error;
        let user = req.user;
        let {description,price,stock,productImg,nameProduct,storeId} = req.body;
        
        try {
            await validationStore(storeId,user)
            let newProduct = new Product({nameProduct,productImg,stock,price,description,storeId});
            await newProduct.save();
            //response = await Product.find();
            response = newProduct;
        } catch (err) {
            console.log(err);
            error = "error missing required fields " + err.message;
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
        const idProduct = req.params.id;
        let {description,price,stock,productImg,nameProduct,storeId} = req.body;
        let user = req.user;
        let response, error;
        try {
            await validationStore(storeId,user);
            const product = await Product.findById(idProduct);
            if(!product) throw new Error("this product doesn't exist");
            if(product.storeId.toString() !== storeId) throw new Error("Not Authorizated, the product does not belong to the store")
            let fieldsObj = {description,price,stock,productImg,nameProduct};
            let update = {};
            for(const field in fieldsObj){
                if(fieldsObj[field])
                   update[field] = fieldsObj[field];
            }

            response = await Product.findByIdAndUpdate(idProduct , update, { new: true });
        } catch (err) {
            console.log(err);
            error = err.name + " " + err.message;
        }
        respondFrontend(res, response, error);
    },
    deleteProduct: async (req, res) => {
        const idProduct = req.params.id;
        let {storeId} = req.body;
        let user = req.user;
        let response, error;
        try {
            await validationStore(storeId,user);
            const product = await Product.findById(idProduct);
            if(!product) throw new Error("this product doesn't exist");
            if(product.storeId.toString() !== storeId) throw new Error("Not Authorizated, the product does not belong to the store")

            response = await Product.findByIdAndDelete(idProduct);
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
