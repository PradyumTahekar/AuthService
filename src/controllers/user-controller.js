const UserService = require('../services/user-service');
const userService = new UserService();

const create = async (req, res) => {

    try {
        const response = await userService.create({
            email:req.body.email,
            password: req.body.password
        });
        res.status(201).json({
            data: response,
            success: true,
            message: "successfully! created a user",
            err: {}
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            data: {},
            success: false,
            message: "Failed!",
            err: error
        })
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        res.status(201).json({
            data: response,
            success: true,
            message: "successfully! sign in a user",
            err: {}
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            data: {},
            success: false,
            message: "Failed!",
            err: error
        })
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        res.status(200).json({
            success:true,
            data: response,
            err: {},
            message:"user is authenticated and token is valid"
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            data: {},
            success: false,
            message: "Failed!",
            err: error
        })
    }
}


module.exports = {
    create,
    signIn,
    isAuthenticated
}