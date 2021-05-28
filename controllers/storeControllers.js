const StoreModel = require('../models/StoreModel')

const storeControllers = {
    getAllStores: async (req, res) => {
        let response;
        let error;
        try {
            const allStores = await StoreModel.find()
            response = allStores
        } catch (error) {
            error = 'An error has occurred on the server, try later!'
        }
        res.json({ success: !error ? true : false, response, error })
    },
    addStore: async (req, res) => {
        let response;
        let error;
        try {
            const addNewStore = new StoreModel({ ...req.body})
            await addNewStore.save()
            response = addNewStore
        } catch {
            error = 'An error has occurred on the server, try later!'
            console.log(error)
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
        } catch (error) {
            error = 'An error has occurred on the server, try later!'
        }
        res.json({ success: !error ? true : false, response, error })
    },
    editStore: async (req, res) => {
        const id = req.params.id
        let response;
        let error;
        try {
            // const store = await StoreModel.findById(id)
            // if(String(store.adminStore) === req.user.id){
                response = await StoreModel.findOneAndUpdate({_id: id}, { ...req.body }, { new: true })                
            // }else{
            //     response = store
            // }
        } catch {
            error = 'An error has occurred on the server, try later!'
            console.log(error)        
        }
        res.json({ success: !error ? true : false, response, error })
    },
    deleteStore: async (req, res) => {
        const id = req.params.id
        let response;
        let error;
        try {
            // const store = await StoreModel.findById(id)
            // if(String(store.adminStore) === req.user.id){
                response = await StoreModel.findByIdAndDelete(id)
            // }
        } catch {
            error = 'An error has occurred on the server, try later!'
            console.log(error)        
        }
        res.json({ success: !error ? true : false, response, error })
    },

    getStoresByCategory: async (req, res) => {
        const idCategory = req.params.id
        let response;
        let error;
        try {
            const groupOfStores = await StoreModel.find({categories: idCategory })
            response = groupOfStores
        } catch (error) {
            error = 'An error has occurred on the server, try later!'
        }
        res.json({ success: !error ? true : false, response, error })
    },
}
module.exports = storeControllers
