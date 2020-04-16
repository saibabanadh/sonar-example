var OrdersModel = require('../models/orders.model');

var ordersHelper = {}

ordersHelper.placeOrder = async (data) => {
    console.log("order place initiated");
    
    try {
        let order = new OrdersModel({
            orderId: data.orderId,
            productName: data.productName,
            productDescription:data.productDescription
        });
        let result = await order.save();
        console.log(result)
       
        return {
            message: "success",
            data:result
        }
    } catch (error) {
        console.log("Erorr");
        console.log(error)
        return {
          message: "Internal Error",
          error: error
        };
      } 
}
ordersHelper.getAllOrders = async (req,res) => {
   
    try {
        let result = await OrdersModel.find();
        return {
            message: "success",
            data:result
        };
    } catch (err) {
        return {
            message: "Internal Error",
            error: error
          };
    } 
}

ordersHelper.getOrderDetails = async (req,res) => {
   
    try {
        let result = await OrdersModel.find({orderId:req.params.orderId});
        return {
            message: "success",
            data:result
        };
    } catch (err) {
        return {
            message: "Internal Error",
            error: error
          };
    } 
}

ordersHelper.updateOrder = async (req, res) => {
    
    try {
        const filter = { 'orderId': req.body.orderId };
        const update = { productName: req.body.productName };
        let result = await OrdersModel.findOneAndUpdate(filter, update, {
            new: true
        });
        return {
            message:"succes",
            data: result
        };
    }catch (error) {
        return {
            message: "Internal Error",
            error: error
        };
    }
}

ordersHelper.deleteOrder = async (req, res) => {
   
    try {
        let orderId = req.params.orderId;
        let result = await OrdersModel.findOneAndDelete({ orderId: orderId })
        return {
            message: "success",
            data:result
          };
    
      } catch (error) {
        return {
          message: "Internal Error",
          error: error
        };
      }
}

module.exports = ordersHelper;
