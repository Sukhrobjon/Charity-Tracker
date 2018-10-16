const mongoose = require('mongoose');

// MODEL
module.exports = mongoose.model('Charity', {
            organizationName: String,
            description: String,
            donationAmount: String
})
