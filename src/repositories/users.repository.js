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

    getUserById = async (id) => {
        let userById = await this.dao.userById(id);
        return userById;
    }

    validateUser = async (email) => {
        let user = await this.dao.validateUser(email);
        return user;
    }

}

module.exports = { UsersRepository }