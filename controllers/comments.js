const Comment = require('../models/comment.js');


module.exports = function (app) {

    // CREATE Comment
    app.post('/charities/comments', (req, res) => {
        console.log('comment created')
        Comment.create(req.body).then(comment => {
            res.redirect(`/charities/${comment.charityId}`);
        }).catch((err) => {
            console.log(err.message);
        });
    });

    // DELETE
    app.delete('/charities/comments/:id', function (req, res) {
        console.log("DELETE comment")
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
            res.redirect(`/charities/${comment.charityId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

}