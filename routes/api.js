require('dotenv').config();
const express = require('express'), router = express.Router();
const paypal = require('paypal-rest-sdk');

const disIPS = require('../models/discount_ips');

const fs = require('fs');

paypal.configure({
    mode:'live',
    client_id:process.env.PAYPAL_CLIENTID,
    client_secret:process.env.PAYPAL_SECRET
});
router.post('/submit', (req,res) => {
    let validSelects = [1,2];
    var { full_name, url, email, p1, p2, p3, selected, discount } = req.body;
    if(!discount || !full_name || !url || !email || !p1 || !p2 || !p3 || p1 <= 0 && p2<= 0 && p3 <= 0 || !validSelects.includes(parseInt(selected))) return res.sendStatus(400);
    const followers = (p1*1000)+(p2*5000)+(p3*10000);
    var price = (p1*1.49)+(p2*7.29)+(p3*13.99);
    try{
        discount = JSON.parse(discount);
    

            let couponsP = fs.readFileSync('./coupons.json');
        couponsP = JSON.parse(couponsP.toString());
        let tpP = selected == 1 ? 'instagram' : 'twitch';
        if(discount !== null){
        let coupon = couponsP.find(cp => cp.name == discount.value && cp.percent == discount.percent && cp.type == tpP);
        if(!coupon) return res.sendStatus(403);

        price =  price - (price / 100 * discount.percent);  
        price = price.toFixed(2);      
        }

    if(followers < 1000) return res.sendStatus(403);
    

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": `https://ezfollowers.herokuapp.com/success`,
            "cancel_url": `https://ezfollowers.herokuapp.com/cancel`
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
                full_name, url, email, p1, p2, p3, selected, discount: discount !== null ? discount.value : null
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
}catch(err)
{
    console.log(err);
    res.sendStatus(403);
}
})


router.get('/discounts/:coupon', async (req,res) =>{
    if(!req.headers.type || !req.params.coupon || !req.headers.ip) {
        res.status(404);
        res.json({code:404,message:'COUPON_NOT_FOUND'});
    }else{
    let coupon = req.params.coupon;
    try{
        let coupons = fs.readFileSync('./coupons.json');
        let json = JSON.parse(coupons.toString());
        let cpp = json.find(cp => cp.name == coupon && cp.type == req.headers.type);
        if(cpp){
            if(cpp.ipTracker == true){
                if(await disIPS.findOne({discount:req.params.coupon, ip: req.headers.ip}))
                {
                    res.status(401);
                    res.json({code:401,message:'COUPON_ALREADY_USED'});
                }else{
                    res.status(200);
                res.json({code:200,message:'COUPON_AVAILAIBLE', percent:cpp.percent ,coupon:cpp});
            }
        }else{

        res.json({code:200,message:'COUPON_AVAILAIBLE', percent:cpp.percent});
            
        }
        
    }else{
        res.status(404);
        res.json({code:404,message:'COUPON_NOT_FOUND'});
    }
    }catch(err)
    {
        console.log(err);
        res.sendStatus(500);
    }
}
})

module.exports = router;