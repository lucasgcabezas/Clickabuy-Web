const StoreModel = require('../models/StoreModel')
const UserModel = require('../models/UserModel')
const CategoryModel = require('../models/CategoryModel')
const fs = require("fs")

const getPathAndNameFile = (store, file, folderName) => {
    let extensionImg = file.name.split(".")[file.name.split(".").length - 1];
    let fileName = `${store.nameStore}-${store._id}.${extensionImg}`;
    //let fileName = `${__dirname}/clients/build/assets/usersImg/${fileName}`
    let filePath = `${__dirname}/../frontend/public/assets/${folderName}/${fileName}`;

    return { filePath, fileName }
}

const validationStore = async  (idStore,user) => {
    const store = await StoreModel.findById(idStore);
    if (!store) throw new Error("this Store doesn't exist")

    userExist = store.owners.find(idUser => idUser.toString() === user._id.toString())
    if (!userExist) throw new Error("this Store doesn't has Authorization")

    return store
}

const storeControllers = {
    getAllStores: async (req, res) => {
        let response;
        let error;
        try {
            const allStores = await StoreModel.find()
            response = allStores
        } catch (err) {
            error = 'An error has occurred on the server, try later!'
        }
        res.json({ success: !error ? true : false, response, error })
    },
    addStore: async (req, res) => {
        let response, error;
        let { category } = req.body;
        let { logoStore } = req.files;

        let user = req.user;
        try {
            category = await CategoryModel.findOne({ nameCategory: category });
            if (!category) throw new Error("this category doesn't exist");

            let newStore = new StoreModel({ ...req.body });
            newStore.owners = [user._id];
            newStore.category = category._id;
            // newStore.storeHero = `/storeHeros/defaultHero.jpg`
            const { filePath, fileName } = getPathAndNameFile(newStore, logoStore, "storeLogos");
            console.log(filePath)
            newStore.logoStore = `/storeLogos/` + fileName;
            await logoStore.mv(filePath);
            await newStore.save()
            response = newStore
        } catch (err) {
            error = `${err.name} : ${err.message}`
            console.log(err)
        }
        res.json({ success: !error ? true : false, response, error })
    },
    getStoreFromId: async (req, res) => {
        const id = req.params.id
        let response;
        let error;
        try {
            const singleStore = await StoreModel.findById(id)
            response = singleStore
        } catch (err) {
            error = `${err.name} : ${err.message}`
            console.log(err)
        }
        res.json({ success: !error ? true : false, response, error })
    },
    editStore: async (req, res) => {
        const idStore = req.params.id;
        const user = req.user;
        let { nameStore, description, category } = req.body;
        let storeHero, logoStore;
        if(req.files){
            storeHero = req.files.storeHero;
            logoStore = req.files.logoStore;
        }
        //update = {} , rellenarlo con ternarios si no son vacios o nullos 
        
        let response, error;
        try {
            let store = await validationStore(idStore,user);
            nameStore && (store.nameStore = nameStore);

            if (storeHero) {
                if (store.storeHero != "/storeHeros/defaultHero.jpg") {
                    fs.unlink(`${__dirname}/../frontend/public/assets/${store.storeHero}`, err => console.log(err));
                }
                const hero = getPathAndNameFile(store, storeHero, "storeHeros");
                await storeHero.mv(hero.filePath);
                storeHero = "/storeHeros/"+hero.fileName;

            }
            if (logoStore) {
                fs.unlink(`${__dirname}/../frontend/public/assets/${store.logoStore}`, err => console.log(err));
                const logo = getPathAndNameFile(store, logoStore, "storeLogos");
                await logoStore.mv(logo.filePath);
                logoStore = "/storeLogos/"+logo.fileName;
            }
            if(category){
                category = await CategoryModel.findOne({ nameCategory: category });
                if (!category) throw new Error("this category doesn't exist");
            }

            let fieldsObj = { nameStore, storeHero, description, category, logoStore }
            let update = {}
            for (const field in fieldsObj) {
                if(fieldsObj[field]){
                    update[field] = fieldsObj[field];
                }
            }
            
            response = await StoreModel.findOneAndUpdate({ _id: idStore }, update, { new: true })
        } catch (err) {
            error = `${err.name} : ${err.message}`
            console.log(err)
        }
        res.json({ success: !error ? true : false, response, error })
    },
    deleteStore: async (req, res) => {
        const idStore = req.params.id
        let response, error;
        let user = req.user
        try {
            
            let store = await validationStore(idStore,user);

            fs.unlink(`${__dirname}/../frontend/public/assets/${store.logoStore}`, err => console.log(err));
            response = await StoreModel.findByIdAndDelete(idStore)

            if (store.storeHero != "/storeHeros/defaultHero.jpg") {
                fs.unlink(`${__dirname}/../frontend/public/assets/${store.storeHero}`, err => console.log(err));
            }
        } catch (err) {
            error = `${err.name} : ${err.message}`
            console.log(err)
        }
        res.json({ success: !error ? true : false, response, error })
    },

    getStoresByCategory: async (req, res) => {
        const idCategory = req.params.id
        let response;
        let error;
        try {
            const groupOfStores = await StoreModel.find({ category: idCategory })
            response = groupOfStores
        } catch (error) {
            error = 'An error has occurred on the server, try later!'
        }
        res.json({ success: !error ? true : false, response, error })
    },
}
module.exports = storeControllers
