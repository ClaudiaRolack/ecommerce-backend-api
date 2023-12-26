class UsersRepository {
    constructor(dao) {
        this.dao = dao
    }

    createUser = async (userData) => {
        let newUser = await this.dao.createUser(userData);
        return newUser;
    }

    getUserByEmail = async (email) => {
        let user = await this.dao.getUserByEmail(email);
        return user;
    }

    userById = async (id) => {
        let userId = await this.dao.userById(id);
        return userId;
    }

    updateUser = async (id, user) => {
        let update = await this.dao.updateUser(id, user);
        return update;
    }

    updatePassword = async (token, newPassword) => {
        let update = await this.dao.updatePassword(token, newPassword);
        return update;
    }

    validateUser = async (email) => {
        let user = await this.dao.validateUser(email);
        return user;
    }

}

module.exports = { UsersRepository }