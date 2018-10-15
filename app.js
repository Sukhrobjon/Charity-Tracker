const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/charityContracter')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// app.get('/', (req, res) => {
//     res.render('home', { msg: 'Handlebars are Cool!' });
//     console.log("Handlebars are")
// })

// OUR MOCK ARRAY OF PROJECTS
const Charity = mongoose.model('Charity', {
    title: String,
    charityTitle: String
});
// let charities = [
//     { title: "Great Review", charityTitle: "Batman II" },
//     { title: "Awesome Movie", charityTitle: "Titanic" }
// ]

// INDEX
// app.get('/', (req, res) => {
//     res.render('charities-index', { charities: charities });
// });
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

// port
app.listen(3000, () => {
    console.log('App listening on port 3000!')
})