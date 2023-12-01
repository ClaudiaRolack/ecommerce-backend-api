const { ordersModel } = require('./models/orders.model.js');

class OrdersMongo {

    createOrder = async (order) => {
        try {
            let result = await ordersModel.create(order);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getOrder = async () => {
        try {
            let result = await ordersModel.find();
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getOrderById = async (id) => {
        try {
            let result = await ordersModel.findById(id);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    resolveOrder = async (id, order) => {
        try {
            let result = await ordersModel.create({ _id: id }, { $set: order });
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}

module.exports = { OrdersMongo }