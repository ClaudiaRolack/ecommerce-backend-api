class UsersRepository {
    constructor(dao) {
        this.dao = dao
    }

    createUser = async (userData) => {
        let newUser = await this.dao.createUser(userData);
        return newUser;
    }

    getAllUsers = async (users) => {
        let user = await this.dao.getAllUsers(users);
        return user;
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

    getCandidatesForDeletion = async (lastConnection) => {
        let connection = await this.dao.getCandidatesForDeletion(lastConnection);
        return connection;
    }

    sendDeletionEmail = async (email) => {
        let deletionEmail = await this.dao.sendDeletionEmail(email);
        return deletionEmail;
    }

    deleteUser = async (id) => {
        let user = await this.dao.deleteUser(id);
        return user;
    }

}

module.exports = { UsersRepository }