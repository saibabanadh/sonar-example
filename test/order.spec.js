const chai = require('chai');
expect = chai.expect;
const OrderHelper = require('../helpers/orders.helper');

// describe('/POST ', () => {
//   it('returns inserted object', async function (done) {
//     let data = {
//       "orderId": "1234",
//       "productName": "tera-cable",
//       "productDescription":"This is a tera cable"
//     }
//     let result = await helper.placeOrder(data);
//     console.log("Result" + JSON.stringify(result));
//     expect(result.data).to.include.property('productName');
//     expect(result.data).to.include.property('orderId');
//     expect(result.data).to.include.property('productDescription');
//     done();
 
//     });
// });

describe('/POST ', () => {
  it('returns inserted object', async function () {
    console.log("test is done")
    let data = {
            "orderId": "1234",
            "productName": "tera-cable",
            "productDescription":"This is a tera cable from test"
          }
    let result = await OrderHelper.placeOrder(data);
        
    });
});








