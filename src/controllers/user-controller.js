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

module.exports = {
    create
}