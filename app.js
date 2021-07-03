const express = require('express'), app = express(), hbs = require('express-handlebars'), indexRoute = require('./routes/index'), apiRoute = require('./routes/api');
const { channelSwitcher, toLower, selected } = require('./helpers/index');
const PORT = process.env.PORT || 3000;

const cookies = require('cookies');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookies.express('a','b','c'))
app.engine('hbs',hbs({
    defaultLayout:'main',
    extname:'.hbs',
    helpers:{
        channelSwitcher,
        toLower,
        selected
    }
}));
app.set('view engine','hbs');
app.use(express.static(process.cwd()+'/public'));

// app.get('*', (req,res) => {
//     //return null;
// })
app.use('/',indexRoute);
app.use('/api',apiRoute);

app.get('*', (req,res)=>{
    res.render('404', {layout:'home'});
})
app.listen(PORT,  () => {
    console.log(`Server live on port ${PORT}`);
})

require('./admin/server');