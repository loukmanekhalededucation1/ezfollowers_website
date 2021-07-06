require('dotenv').config();
const express = require('express'), router = express.Router();
const nodemailer = require('nodemailer');

const mongoose = require('mongoose');

const fs = require('fs');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>console.log('Mongodb Connected')).catch((err)=>{throw err});

const followers = require('../models/followers');
const disIPS = require('../models/discount_ips');
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})

router.get('/',(req,res)=>{
    res.render('home', {layout:'home'});
})
router.get('/buy',(req,res)=>{
    res.render('buy');
})
router.get('/views',async (req,res)=>{
    let { selected, view, discount } = req.headers;
    if(typeof selected == 'undefined' || typeof view == 'undefined' || typeof discount == 'undefined')
        return res.sendStatus(400);
    
        
        try{
        discount = JSON.parse(discount);
        let coupons = fs.readFileSync('./coupons.json');
        coupons = JSON.parse(coupons.toString());
        let tp = selected == 1 ? 'instagram' : 'twitch';
        var cpp = null;
        if(discount !== null){
        cpp = coupons.find(cp => cp.name == discount.value && cp.percent == discount.percent && cp.type == tp);
        if(cpp){
            if(cpp.ipTracker == true){
                if(await disIPS.findOne({discount:req.params.coupon, ip: req.headers.ip}))
                {
                    res.status(401);
                    return res.json({code:401,message:'COUPON_ALREADY_USED'});
                }
        }
        
    }else{
        res.status(404);
        return res.json({code:404,message:'COUPON_NOT_FOUND'});
    }
        if(!cpp) return res.sendStatus(400);
        }

    if(view == 2)
    {
        res.render('view2',{selected, layout:null});
    }else if(view == 3)
    {
        let { full_name, url, email } = req.headers;
        if(typeof full_name == 'undefined' || full_name == '' || typeof url == 'undefined' || url == '' || typeof email == 'undefined' || email == '') return res.sendStatus(400);
        res.render('view3',{selected, layout:null});
    }else if(view == 4) {
        let { ip, discount, full_name, url, email } = req.headers;
        if(typeof ip == 'undefined' || ip == '' || ip == 0|| typeof discount == 'undefined' || typeof full_name == 'undefined' || full_name == '' || typeof url == 'undefined' || url == '' || typeof email == 'undefined' || email == '') return res.sendStatus(400);

       
        discount = JSON.parse(discount);

            let fls = cpp.offer.split('-')[0];
        const user = new followers({
            full_name,
            email,
            followers:fls,
            price:'0.00',
            url,
            requestedOffer:cpp.offer.split('-')[1],
            discount:discount.value
        });
        const user_ip = new disIPS({
            discount: discount.value,
            ip:req.headers.ip
        });
        await user.save();
        await user_ip.save();
        res.render('success', {d1:1,layout:null,details:{
            user:{
              full_name, url, email, selected, discount: discount !== null ? discount.value : null
            },
            payment: {
                transactions:[{
                    item_list:{
                        items:[{
                            name:cpp.offer.split('-')[0]+' '+cpp.offer.split('-')[1] == 1 ? 'Instagram' : 'Twitch'+' Followers',
                            price:'0.00'
                        }]
                    }
                }]
            },
            price:'0.00',
            followers:fls
        }
        });

        transporter.sendMail({
            from:process.env.EMAIL,
            to:email,
            subject:'Payement Info',
            text:`Hey ${full_name}\nWe want to notice you that your paiment of : ${fls+' '+cpp.offer.split('-')[1] == 1 ? 'Instagram' : 'Twitch'+' Followers'} has been completelly done.\nPlease wait atleast 24 hours to get your selected item, you will be automatically emailed with that\n\nThank you for choosing us.\nBy Thunders E-SPORTS`
        }, (err,result)=>{
            if(err) return;
        })

        


    }else{
        res.sendStatus(400);
    }
}catch(err){
    console.log(err);
    res.sendStatus(400);
}
    
})

router.get('/success', async (req,res) => {
    if(!req.query.paymentId || !req.query.token) return res.redirect('/');
    if(!req.cookies.get('details')) return res.redirect('/');
    try{
    let details = JSON.parse(new Buffer.from(req.cookies.get('details'),'base64').toString('ascii'));
    if(!details.user || !details.payment || !details.price || !details.followers || !details.user.url) return res.redirect('/');
    const user = new followers({
        full_name: details.user.full_name,
        email: details.user.email,
        followers: details.followers,
        price:details.price,
        url:details.user.url,
        requestedOffer:details.user.selected,
        discount:details.user.discount
    })
    await user.save();
    res.render('success', {details});
    res.clearCookie('details');
    transporter.sendMail({
        from:process.env.EMAIL,
        to:details.user.email,
        subject:'Payement Info',
        text:`Hey ${details.user.full_name}\nWe want to notice you that your paiment of : ${details.payment.transactions[0].item_list.items[0].name} has been completelly done.\nPlease wait atleast 24 hours to get your selected item, you will be automatically emailed with that\n\nThank you for choosing us.\nBy Thunders E-SPORTS`
    }, (err,result)=>{
        if(err) return;
    })
    }catch(err){
        res.redirect('/');
    }
})
router.get('/cancel', (req,res) => {
    res.clearCookie('details');
    res.redirect('/');
})
router.get('/discord', (req,res) => {
    res.redirect('https://discord.gg/DrKRbZ7QDr');
})
module.exports = router;