const Charity = require('../models/charity.js');
const Comment = require('../models/comment.js');
require('dotenv').config()

// UPLOADING TO AWS S3
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const Upload = require('s3-uploader');
console.log("bucket name: " + process.env.S3_BUCKET)
const client = new Upload(process.env.S3_BUCKET, {
    aws: {
        path: 'charity/avatar',
        region: process.env.S3_REGION,
        acl: 'public-read',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    cleanup: {
        versions: true,
        original: true
    },
    versions: [{
        maxWidth: 400,
        aspect: '16:10',
        suffix: '-standard'
    }, {
        maxWidth: 300,
        aspect: '1:1',
        suffix: '-square'
    }]
});

module.exports = function (app) {

    // INDEX
    app.get('/', (req, res) => {
        return res.redirect("page/1")
    })

    // PAGINATION
    app.get('/page/:number', (req, res) => {
        intNumber = Number(req.params.number)
        if(isNaN(intNumber)){
            return res.redirect("/page/1")
            // intNumber = 1
        } else if(intNumber < 1){
            // intNumber = 1
            return res.redirect("/page/1")
        }
        const limitPage = 3
        Charity.find().skip((intNumber - 1) * limitPage).limit(limitPage)
            .then(charity => {
                    // consider to check the end of the page has exactly number of limit
                    res.render('charities-index', {
                        charity: charity, previous: intNumber - 1, 
                            next: intNumber + 1, end: !(charity.length < limitPage)
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


    // // CREATE
    // app.post('/charities', (req, res) => {
    //     Charity.create(req.body).then((charity) => {
    //         console.log(charity);
    //         res.redirect(`/charities/${charity._id}`);
    //     }).catch((err) => {
    //         console.log(err.message);
    //     })
    // })

    // CREATE Charity
    app.post('/charities', upload.single('avatar'), (req, res, next) => {
        var charity = new Charity(req.body);
        charity.save(function (err) {
        if (req.file) {
            client.upload(req.file.path, {}, function (err, versions, meta) {
            if (err) { return res.status(400).send({ err: err }) };

            // let imgUrl = versions[0].url.split('-');
            var urlArray = versions[0].url.split('-');
            urlArray.pop();
            var url = urlArray.join('-');
            charity.avatarUrl = url;
            charity.save();
           
            res.send({ charity: charity });
            });
        } else {
            res.send({ charity: charity });
        }
        })
    })


    
    // SHOW ID
    app.get('/charities/:id', (req, res) => {
        // find review
        Charity.findById(req.params.id).then(charity => {
            // fetch its comments
            Comment.find({
                charityId: req.params.id
            }).then(comments => {
                // respond with the template with both values
                res.render('charities-show', {
                    charity: charity,
                    comments: comments
                })
            })
        }).catch((err) => {
            // catch errors
            console.log(err.message)
        });
    });



    // EDIT
    app.get('/charities/:id/edit', (req, res) => {
        Charity.findById(req.params.id, function (err, charity) {
            res.render('charities-edit', {
                charity: charity
            });
        })
    })

    // UPDATE
    app.put('/charities/:id', (req, res) => {
        Charity.findByIdAndUpdate(req.params.id, req.body)
            .then(charity => {
                res.redirect(`/charities/${charity._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    // DELETE
    app.delete('/charities/:id', function (req, res) {
        console.log("DELETE the Organization")
        Charity.findByIdAndRemove(req.params.id).then((charity) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })

    // SEARCH organization by name
    app.get('/search', (req, res) => {
        const organization = new RegExp(req.query.organization, 'i')

        Charity.find({$or:[
            {
                'organizationName': organization
            },
            {
                'description': organization
            }

        ]}).exec((err, charity) => {
            res.render('charities-index', { charity });
        })
    });

}