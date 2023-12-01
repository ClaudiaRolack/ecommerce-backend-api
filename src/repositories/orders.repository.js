class OrdersRepository {
    constructor(dao) {
        this.dao = dao
    }

    createOrder = async (order) => {
        let newOrder = await this.dao.createOrder(order);
        return newOrder;
    }
    
    getOrder = async () => {
        let order = await this.dao.getOrder();
        return order;
    }

    getOrderById = async (id) => {
        let orderById = await this.dao.getOrderById(id);
        return orderById;
    }  

    resolveOrder = async (id, order) => {
        let resolve = await this.dao.resolveOrder(id, order);
        return resolve;
    }

}

module.exports = { OrdersRepository }