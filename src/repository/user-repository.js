const { User } = require('../models/index');

class UserRepository {

    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async destroy(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
    async getById(id)
    {
        try {
            const user = await User.findByPk(id, {
                attributes: ["email","id"]
            });
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getByEmail(userEmail)
    {
        try {
            const user = await User.findOne({
                where:{
                    email: userEmail
                }
            });
            return user;   
        } catch (error) {
            
        }
    }


}

module.exports = UserRepository;