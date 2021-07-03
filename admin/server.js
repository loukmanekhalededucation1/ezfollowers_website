const express = require('express'), app = express();

const followers = require('../models/followers');

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine','ejs');
app.set('views','./admin/views');
app.get('/', (req,res) => {
    res.render('login');
})



app.post('/admin', async(req,res) =>{
    if(req.body.user && req.body.pass)
    {
        if(req.body.user == 'thunders_admin' && req.body.pass=="#0ezfollowerspassgmail#113#1")
        {
            try{
                const f = await followers.find({});
            res.render('admin', {followers:f});
            }catch(err)
            {
                console.log(err);
                res.redirect('/');
            }
        }else res.redirect('/');
    }else res.redirect('/');
})
app.post('/followers', async (req,res)=>{
    try{
        if(!req.body.user || !req.body.pass) return;
        if(req.body.user == 'thunders_admin' && req.body.pass == '#0ezfollowerspassgmail#113#1'){
        const f = await followers.find({});
        res.render('list', {followers:f});
        }
    }catch(err)
    {
        console.log(err);
    }
})
app.delete('/users', async (req,res) => {
    let user_id = req.headers.req_id;
    if(!user_id) return;
    try{
        const user = await followers.findById(user_id, {});
        if(!user) return;
        transporter.sendMail({
            from:process.env.EMAIL,
            to:user.email,
            subject:'Done',
            text:`Hey ${user.full_name}\nYou have successfully received your choosen amount of ${user.requestedOffer == 1 ? 'Instagram' : 'Twitch'} followers which is ${user.followers} followers, go check out in ${user.url}\n\nThank you for choosing us.\nBy Thunders E-SPORTS`
        }, (error,rs)=>{
            
        })
        await followers.findByIdAndDelete(user);
        res.json({code:200,message:'Deleted successfully'});
    }catch(err)
    {
        //console.log(err)
        return;
    }
})
app.listen(54000, ( ) => console.log('Server live on port 54000'));