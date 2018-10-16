const express = require('express')
const methodOverride = require('method-override')
const app = express()
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// Controllers
const charities = require('./controllers/charities.js');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/charityContracter', {
    useNewUrlParser: true
});


charities(app);
// port
app.listen(3000, () => {
    console.log('App listening on port 3000!')
})