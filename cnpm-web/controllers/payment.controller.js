const https = require('https');
const crypto = require('crypto');
var uuid = require('uuid');
module.exports.momo = function (req, response){
    //parameters send to MoMo get get payUrl
    var endpoint = "https://test-payment.momo.vn/gw_payment/transactionProcessor"
    var hostname = "https://test-payment.momo.vn"
    var path = "/gw_payment/transactionProcessor"
    var partnerCode = "MOMO51SZ20200726"
    var accessKey = "FuT5xOgxfOKcueq8"
    var serectkey = "IXyFr716Z1uPaJYMuMKhaRWzMmI0NNoP"
    var orderInfo = "Pay with MoMo"
    var returnUrl = "https://momo.vn/return"
    var notifyurl = "https://callback.url/notify"
    var amount = req.body.cost.toString();
    var orderId = uuid.v1()
    var requestId = uuid.v1()
    var requestType = "captureMoMoWallet"
    var extraData = ""

    var rawSignature = "partnerCode="+partnerCode+"&accessKey="+accessKey+"&requestId="+requestId+"&amount="+amount+"&orderId="+orderId+"&orderInfo="+orderInfo+"&returnUrl="+returnUrl+"&notifyUrl="+notifyurl+"&extraData="+extraData
    
    var signature = crypto.createHmac('sha256', serectkey)
                       .update(rawSignature)
                       .digest('hex');
    
    //json object send to MoMo endpoint
    var body = JSON.stringify({
        partnerCode : partnerCode,
        accessKey : accessKey,
        requestId : requestId,
        amount : amount,
        orderId : orderId,
        orderInfo : orderInfo,
        returnUrl : returnUrl,
        notifyUrl : notifyurl,
        extraData : extraData,
        requestType : requestType,
        signature : signature,
    })
    //Create the HTTPS objects
    var options = {
      hostname: 'test-payment.momo.vn',
      port: 443,
      path: '/gw_payment/transactionProcessor',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
     }
    };
    
    var req = https.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (body) => {
        console.log(JSON.parse(body).payUrl);
        response.send(JSON.parse(body).payUrl);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });
    
    req.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
    });

    req.write(body);
    req.end();
}