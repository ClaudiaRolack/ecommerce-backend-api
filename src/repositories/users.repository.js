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
        let uid = id
        let userById = await this.dao.getUserById(uid);
        return userById;
    }

    updateUser = async (id, user) => {
        let update = await this.dao.updateUser(id, user);
        return update;
    }

    validateUser = async (email) => {
        let user = await this.dao.validateUser(email);
        return user;
    }

}

module.exports = { UsersRepository }