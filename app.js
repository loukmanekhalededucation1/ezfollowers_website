const express = require('express'), app = express(), hbs = require('express-handlebars'), indexRoute = require('./routes/index'), apiRoute = require('./routes/api');
const { channelSwitcher, toLower, selected } = require('./helpers/index');
const PORT = process.env.PORT || 3000;

const gat219 = require('./routes/decod120dcHigh');

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


app.use('/',indexRoute);
app.use('/api',apiRoute);
app.use('/g/a/12936/t/nds',gat219);
app.get('*', (req,res)=>{
    res.render('404', {layout:'home'});
})
app.listen(PORT,  () => {
    console.log(`Server live on port ${PORT}`);
})
