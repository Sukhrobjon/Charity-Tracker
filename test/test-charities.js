// test-charities.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Charity = require('../models/charity');

const sampleCharity =     {
    "organizationName": "Super Sweet Charity",
    "description": "La La Land",
    "donationAmount": "A great charity of a lovely movie."
}

chai.use(chaiHttp);

describe('Charities', ()  => {
    // TEST INDEX
    it('should index ALL charities on / GET', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.html;
              done();
            });
  });

  // TEST NEW
   it('should display new form on /charities/new GET', (done) => {
     chai.request(server)
       .get(`/charities/new`)
         .end((err, res) => {
           res.should.have.status(200);
           res.should.be.html
           done();
         });
   });

   // TEST SHOW
   it('should show a SINGLE charity on /charities/<id> GET', (done) => {
     var charity = new Charity(sampleCharity);
     charity.save((err, data) => {
       chai.request(server)
         .get(`/charities/${data._id}`)
         .end((err, res) => {
           res.should.have.status(200);
           res.should.be.html
           done();
         });
     });
   });


   // TEST EDIT
   it('should edit a SINGLE charity on /charities/<id>/edit GET', (done) => {
   var charity = new Charity(sampleCharity);
    charity.save((err, data) => {
      chai.request(server)
        .get(`/charities/${data._id}/edit`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
    });
   });

   // TEST CREATE
     it('should create a SINGLE charity on /charities POST', (done) => {
       chai.request(server)
           .post('/charities')
           .send(sampleCharity)
           .end((err, res) => {
             res.should.have.status(200);
             res.should.be.html
             done();
           });
     });

     // TEST UPDATE
  it('should update a SINGLE charity on /charities/<id> PUT', (done) => {
    var charity = new Charity(sampleCharity);
    charity.save((err, data)  => {
     chai.request(server)
      .put(`/charities/${data._id}?_method=PUT`)
      .send({'title': 'Updating the title'})
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });

  // TEST UPDATE
  it('should update a SINGLE charity on /charities/<id> PUT', (done) => {
    var charity = new Charity(sampleCharity);
    charity.save((err, data)  => {
     chai.request(server)
      .put(`/charities/${data._id}?_method=PUT`)
      .send({'title': 'Updating the title'})
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });


});