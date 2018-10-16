const express = require('express')

const methodOverride = require('method-override')
const app = express()
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));


// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/charityContracter', {
    useNewUrlParser: true
});

// Model
const Charity = mongoose.model('Charity', {
    organizationName: String,
    description: String,
    donationAmount: String
});
// let charities = [
//     { title: "Great charity", charityTitle: "Batman II" },
//     { title: "Awesome Movie", charityTitle: "Titanic" }
// ]

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

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
app.post('/charities', (req, res) => {
    Charity.create(req.body).then((charity) => {
        console.log(charity);
        // res.redirect('/');
        res.redirect(`/charities/${charity._id}`) // Redirect to charitys/:id
    }).catch((err) => {
        console.log(err.message);
    })
})

// SHOW
app.get('/charities/:id', (req, res) => {
    Charity.findById(req.params.id).then((charity) => {
        res.render('charities-show', { charity: charity })
    }).catch((err) => {
        console.log(err.message);
    })
});

// EDIT
app.get('/charities/:id/edit', (req, res) => {
    Charity.findById(req.params.id, function (err, charity) {
        res.render('charities-edit', { charity: charity });
    })
});


// UPDATE
app.put('/charities/:id', (req, res) => {
    Charity.findByIdAndUpdate(req.params.id, req.body)
        .then(charity => {
            res.redirect(`/charities/${charity._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
});
// DELETE
app.delete('/charities/:id', function (req, res) {
    console.log("DELETE charity Organization")
    Charity.findByIdAndRemove(req.params.id).then((charity) => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})

// port
app.listen(3000, () => {
    console.log('App listening on port 3000!')
})