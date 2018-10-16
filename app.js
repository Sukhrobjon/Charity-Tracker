const express = require('express')
const methodOverride = require('method-override')
const charities = require('./controllers/charities');
// const comments = require('./controllers/comments');
const mongoose = require('mongoose');
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 3000;
var exphbs = require('express-handlebars');


app.use(bodyParser.urlencoded({
    extended: true
}));
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/charityContractor', {
    useNewUrlParser: true
});

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

charities(app);
// comments(app);

app.listen(port);
module.exports = app;
