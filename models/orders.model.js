
var mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    orderId: {type: String},
    productName: { type: String },
    productDescription:{type:String},
   
  },{timestamps: true});
     
var Order = mongoose.model("orders", orderSchema);
module.exports = Order