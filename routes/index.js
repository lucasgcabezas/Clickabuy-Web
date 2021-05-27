const express = require('express')
const router = express.Router()
const validator = require('../config/validator')
const passport = require("passport")
const userControllers = require('../controllers/userControllers')
const storeControllers = require('../controllers/storeControllers')
const productControllers = require('../controllers/productControllers')
const categoryControllers = require('../controllers/categoryController')
const { addUser, getAllUsers, getUserById, updateUser, deleteUser, loginUser, forcedLogin} = userControllers
const { getAllStores, addStore, getStoreFromId, editStore, deleteStore} = storeControllers
const { getAllCategories, getSingleCategory, addCategory, deleteCategory, modifyCategory } = categoryControllers
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = productControllers

router.route("/users")
    .get(getAllUsers)
    .post(validator, addUser)

router.route("/login")
    .post(loginUser)

router.route("/relogin")
    .get(passport.authenticate('jwt', { session: false }), forcedLogin)

router.route("/user/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router.route("/stores")
    .get(getAllStores)
    .post(addStore)

router.route("/store/:id")
    .get(getStoreFromId)
    .put(passport.authenticate('jwt', { session: false }), editStore)
    .delete(passport.authenticate('jwt', { session: false }), deleteStore)

router.route("/categories")
    .get(getAllCategories)
    .post(addCategory)

router.route("/category/:id")
    .get(getSingleCategory)
    .put(modifyCategory)
    .delete(deleteCategory)

router.route("/products")
    .get(getAllProducts)
    .post(addProduct)

router.route("/product/:id")
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct)

module.exports = router