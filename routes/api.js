const express = require('express'), router = express.Router();
const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode:'live',
    client_id:process.env.PAYPAL_CLIENTID,
    client_secret:process.env.PAYPAL_SECRET
});
router.post('/submit', (req,res) => {
    let validSelects = [1,2];
    const { full_name, url, email, p1, p2, p3, selected } = req.body;
    if(!full_name || !url || !email || !p1 || !p2 || !p3 || p1 <= 0 && p2<= 0 && p3 <= 0 || !validSelects.includes(parseInt(selected))) return res.sendStatus(400);
    const followers = (p1*1000)+(p2*5000)+(p3*10000);
    const price = (p1*1.49)+(p2*7.29)+(p3*13.99);
    if(price < 1.49 || followers < 1000) return res.sendStatus(403);
    

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": `${followers} ${selected == 1 ? 'Instagram' : 'Twitch'} followers`,
                    "sku": "001",
                    "price": price,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": price
            },
            "description": "By Thunders E-SPORTS"
        }]
    };
    
    paypal.payment.create(create_payment_json, function (err, payment) {
      if (err) {
          console.log(err);
      } else {
          req.cookies.set('details',new Buffer.from(JSON.stringify({
              user:{
                full_name, url, email, p1, p2, p3, selected
              },
              payment,
              price,
              followers
          }),'ascii').toString('base64'))
          for(let i = 0;i < payment.links.length;i++){
            if(payment.links[i].rel === 'approval_url'){
              res.redirect(payment.links[i].href);
            }
          }
      }
    });
})


module.exports = router;