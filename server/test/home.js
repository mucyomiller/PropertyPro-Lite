import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

// Configure chai
chai.use(chaiHttp);
chai.should();

// eslint-disable-next-line no-unused-vars
const { expect, assert } = chai;

describe('API Entry Point', () => {
  describe('GET /', () => {
    it('it should return welcome message', done => {
      chai
        .request(app)
        .get('/api/v2/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Welcome to PropertyPro-Lite API V2.0!');
        });
      done();
    });
    it('it should return 404 wiht specified message', done => {
      chai
        .request(app)
        .get('/api/v2/notfound')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error').eql('Route Not Found!');
        });
      done();
    });
  });
});
