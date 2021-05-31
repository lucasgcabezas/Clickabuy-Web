const User = require("../models/UserModel");
const bcryptsjs = require("bcryptjs");
const jwToken = require("jsonwebtoken");
const fs = require("fs");

const respondFrontend = (res, response, error) => {
  res.json({
    success: !error ? true : false,
    response,
    error,
  });
};
const errorBackend = "error 500 , avisar al  team backend";
const errorUserNotFound = "error: User not found";

const userControllers = {
    addUser: async (req, res) => {
        let response, error;
        let { email, password, loggedWithGoogle } = req.body;
        loggedWithGoogle = JSON.parse(loggedWithGoogle) ;
        let  userImg,extensionImg ; 
        
        if(!loggedWithGoogle ){
            userImg  = req.files.userImg;
            extensionImg = userImg.name.split(".")[userImg.name.split(".").length - 1];
        }   
        
        
        try {
            let userExist = await User.findOne({ email });
            if (!userExist) {
                password = bcryptsjs.hashSync(password, 10);
                let newUser = new User({ ...req.body, password });
                if (!loggedWithGoogle) {
                    let fileName = `${newUser._id}.${extensionImg}`;
                    //let fileName = `${__dirname}/clients/build/assets/usersImg/${fileName}`
                    let filePath = `${__dirname}/../frontend/public/assets/usersImg/${fileName}`;
                    newUser.userImg = "/usersImg/" + fileName;
                    await userImg.mv(filePath)
                }
                await newUser.save();
                let token = jwToken.sign({ ...newUser }, process.env.SECRET_OR_KEY);
                response = {
                    ...newUser.toObject(),
                    _id: undefined,
                    password: undefined,
                    token,
                }
            }
            else {
                error = "This email is already in use, choose another";
            }
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },

    getAllUsers: async (req, res) => {
        let response, error;
        try {
            response = await User.find();
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },

    getUserById: async (req, res) => {
        let response, error;
        let id = req.params.id;
        try {
            response = await User.findById(id);
            response || (error = errorUserNotFound);
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },

    updateUser: async (req, res) => {
        let response, error;
        let id = req.params.id;
        try {
            response = await User.findByIdAndUpdate(id, req.body, { new: true });
            response || (error = errorUserNotFound);
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },

    deleteUser: async (req, res) => {
        let response, error;
        let id = req.params.id;
        try {
            let userDeleted = await User.findByIdAndRemove(id);

            if (!userDeleted) throw new Error("id not found on Collection Users");
            if(userDeleted.loggedWithGoogle){
                fs.unlink(`${__dirname}/../frontend/public/assets/${userDeleted.userImg}`, err => console.log(err));
            }
            
            response = await User.find();
        } catch (err) {
            console.log(err);
            error = err.message;
        }
        respondFrontend(res, response, error);
    },

    loginUser: async (req, res) => {
        let response, error;
        let { email, password } = req.body;
        try {
            let userExist = await User.findOne({ email });
            if (userExist) {//aqui va lo de google
                if (bcryptsjs.compareSync(password, userExist.password)) {
                    let token = jwToken.sign({ ...userExist }, process.env.SECRET_OR_KEY);
                    response = {
                        ...userExist.toObject(),
                        _id: undefined,
                        token
                    }
                } else
                    error = "Please provide a valid email and password ";
            } else
                error = "Please provide a valid email and password ";

        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },
    forcedLogin: async (req, res) => {

    try {
      let userExist = await User.findOne({ email });
      if (!userExist) {
        password = bcryptsjs.hashSync(password, 10);
        let newUser = new User({ ...req.body, password });
        if (!loggedWithGoogle) {
          let fileName = `${newUser._id}.${extensionImg}`;
          //let fileName = `${__dirname}/clients/build/assets/usersImg/${fileName}`
          let filePath = `${__dirname}/../frontend/public/assets/usersImg/${fileName}`;
          newUser.userImg = "/usersImg/" + fileName;
          await userImg.mv(filePath);
        }

        await newUser.save();

        let token = jwToken.sign({ ...newUser }, process.env.SECRET_OR_KEY);
        response = {
          ...newUser.toObject(),
          _id: undefined,
          password: undefined,
          token,
        };
      } else {
        error = "This email is already in use, choose another";
      }
    } catch (err) {
      console.log(err);
      error = errorBackend;
    }
    respondFrontend(res, response, error);
  },

  getAllUsers: async (req, res) => {
    let response, error;
    try {
      response = await User.find();
    } catch (err) {
      console.log(err);
      error = errorBackend;
    }
    respondFrontend(res, response, error);
  },

  getUserById: async (req, res) => {
    let response, error;
    let id = req.params.id;
    try {
      response = await User.findById(id);
      response || (error = errorUserNotFound);
    } catch (err) {
      console.log(err);
      error = errorBackend;
    }
    respondFrontend(res, response, error);
  },

  updateUser: async (req, res) => {
    let response, error;
    let id = req.params.id;
    try {
      response = await User.findByIdAndUpdate(id, req.body, { new: true });
      response || (error = errorUserNotFound);
    } catch (err) {
      console.log(err);
      error = errorBackend;
    }
    respondFrontend(res, response, error);
  },

  deleteUser: async (req, res) => {
    let response, error;
    let id = req.params.id;
    try {
      let userDeleted = await User.findByIdAndRemove(id);

      if (!userDeleted) throw new Error("id not found on Collection Users");
      fs.unlink(`${__dirname}/../frontend/public/assets/${userDeleted.userImg}`, (err) =>
        console.log(err)
      );
      response = await User.find();
    } catch (err) {
      console.log(err);
      error = err.message;
    }
    respondFrontend(res, response, error);
  },

  loginUser: async (req, res) => {
    let response, error;
    let { email, password } = req.body;
    try {
      let userExist = await User.findOne({ email });
      if (userExist) {
        //aqui va lo de google
        if (bcryptsjs.compareSync(password, userExist.password)) {
          let token = jwToken.sign({ ...userExist }, process.env.SECRET_OR_KEY);
          response = {
            ...userExist.toObject(),
            _id: undefined,
            token,
          };
        } else error = "Please provide a valid email and password ";
      } else error = "Please provide a valid email and password ";
    } catch (err) {
      console.log(err);
      error = errorBackend;
    }
    respondFrontend(res, response, error);
  },
  forcedLogin: async (req, res) => {
    let response = {
      ...req.user.toObject(),
      _id: undefined,
      password: undefined,
    };

    respondFrontend(res, response, undefined);
  },
};

module.exports = userControllers;
