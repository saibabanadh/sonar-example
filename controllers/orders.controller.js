var OrdersModel = require('../models/orders.model');
var OrdersHelper = require('../helpers/orders.helper');

var ordersControler = {}

ordersControler.placeOrder = async (req, res) => {
    
    let result = await OrdersHelper.placeOrder(req.body);
       
    if (result.data) {
        return res.status(200).json({
            message: "success",
            data:result.data
        });
    }
    return res.status(500).json({
        message: "Internal Error",
        error: result.error
        });
}

ordersControler.getOrderDetails = async (req, res) => { 
    let result = await OrdersHelper.getOrderDetails(req, res);
       
    if (result.data) {
        return res.status(200).json({
            message: "success",
            data:result.data
        });
    }
    return res.status(500).json({
        message: "Internal Error",
        error: result.error
        });
}

ordersControler.getAllOrders = async (req,res) => {
    let result = await OrdersHelper.getAllOrders(req,res);
    if (result.data) {
        return res.status(200).json({
            message: "success",
            data:result.data
        });
    }
    return res.status(500).json({
        message: "Internal Error",
        error: result.error
        });
}

ordersControler.updateOrder = async (req, res) => {
    
    let result = await OrdersHelper.updateOrder(req, res);
    if (result.data) {
        return res.status(200).json({
            message: "success",
            data:result.data
        });
    }
    return res.status(500).json({
        message: "Internal Error",
        error: result.error
        });
}
ordersControler.deleteOrder = async (req, res) => {
   
    let result = await OrdersHelper.deleteOrder(req, res);
    if (result.data) {
        return res.status(200).json({
            message: "success deleted the order"
        });
    }
    return res.status(500).json({
        message: "Internal Error",
        error: result.error
        });
}

module.exports = ordersControler
