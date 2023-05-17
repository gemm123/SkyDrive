const User = require('../models/user');

class UserRepository {
    async createUser(username, email, password) {
        try {
            const user = await User.create({ username, email, password })
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ where: { email } });
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserRepository;