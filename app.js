const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/charityContracter')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));


// Model
const Charity = mongoose.model('Charity', {
    organizationName: String,
    description: String,
    donationAmount: Number
});
// let charities = [
//     { title: "Great Review", charityTitle: "Batman II" },
//     { title: "Awesome Movie", charityTitle: "Titanic" }
// ]

// INDEX
app.get('/', (req, res) => {
    Charity.find()
        .then(charities => {
            res.render('charities-index', {
                charities: charities
            });
        })
        .catch(err => {
            console.log(err);
        })
})

// NEW
app.get('/charities/new', (req, res) => {
    res.render('charities-new', {});
})

// CREATE
// CREATE
app.post('/charities', (req, res) => {
    Charity.create(req.body).then((review) => {
        console.log(review);
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})


// port
app.listen(3000, () => {
    console.log('App listening on port 3000!')
})