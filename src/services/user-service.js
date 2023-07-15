const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try {
            // fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            // step 2 compare incoming plain password with encrypted password

            const passwordsMatch = this.checkPassword(plainPassword, user.password);
            if (!passwordsMatch) {
                console.log("Password doesn't match");
                throw { error: "Incorrect Password" };
            }
            // if match then create token
            else {
                const newJWT = this.createToken({ email: user.email, id: user.id });
                return newJWT;
            }
        } catch (error) {
            console.log("Something went wrong in the sign in process");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, TOKEN_KEY, { expiresIn: "1h" });
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }

    verifyToke(token) {
        try {
            const response = jwt.verify(token, TOKEN_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token verification", error);
            throw error;
        }

    }

    checkPassword(userInputPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison", error);
            throw error;
        }
    }
}

module.exports = UserService;

