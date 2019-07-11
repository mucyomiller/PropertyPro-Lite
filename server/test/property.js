// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import httpMocks from 'node-mocks-http';
import Joi from '@hapi/joi';
import app from '../index';
import properties from '../model/properties';
import PropertyController from '../controllers/PropertyController';
import { genericValidator } from '../middleware/validation';

// Configure chai
chai.use(chaiHttp);
chai.should();

// eslint-disable-next-line no-unused-vars
const { expect, assert } = chai;

describe('Properties', () => {
  describe('GET /', () => {
    it('should return all properties listed', done => {
      chai
        .request(app)
        .get('/api/v1/properties')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('data').be.a('array');
          res.body.should.have.property('data').eql(properties);
          done();
        });
    });

    it('should return a specific property listed', done => {
      chai
        .request(app)
        .get('/api/v1/property/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('data').be.a('object');
          res.body.should.have.property('data').eql(properties[0]);
          done();
        });
    });

    it('should return 404 when  specified property is not found!', done => {
      chai
        .request(app)
        .get('/api/v1/property/100')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error').be.a('string');
          res.body.should.have.property('error').eql('No property found');
          done();
        });
    });

    it('should return  properties by type', done => {
      chai
        .request(app)
        .get('/api/v1/property?type=3 bedroom')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('data').be.a('array');
          done();
        });
    });
    it('should return 404 if no available properties of such type', done => {
      chai
        .request(app)
        .get('/api/v1/property?type=3 express')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have
            .property('error')
            .be.a('string')
            .eql('No available properties of such a type');
          done();
        });
    });
  });

  describe('PATCH /', () => {
    it('it should return 404 after failed to updated specific property', done => {
      chai
        .request(app)
        .patch('/api/v1/property/100')
        .send({
          price: 1000
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have
            .property('error')
            .eql('property your are trying to update is not available!');
          done();
        });
    });
    it('it should fails with errors if you dont meet required properties', done => {
      chai
        .request(app)
        .patch('/api/v1/property/1')
        .send({
          prices: 1000
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors').be.a('array');
          done();
        });
    });
    it('it should return 200 after successfully updated specific property', done => {
      chai
        .request(app)
        .patch('/api/v1/property/1')
        .send({
          price: 100
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('it should mark as sold specified property', done => {
      chai
        .request(app)
        .patch('/api/v1/property/1/sold')
        .set('content-type', 'application/json')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property('data')
            .be.a('object')
            .have.property('status')
            .eql('sold');
          done();
        });
    });

    it('it should fails to mark property as sold if not available', done => {
      chai
        .request(app)
        .patch('/api/v1/property/100/sold')
        .set('content-type', 'application/json')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error').be.eql('No property found');
          done();
        });
    });
  });

  describe('POST /', () => {
    it('it should return 201 and newly created property object', done => {
      // TODO: i will comeback to this!
      sinon.stub(PropertyController, 'addNewProperty').callsFake(() => {
        return {
          status: 201,
          data: {
            id: 2,
            owner: 1,
            status: 'sold',
            price: '100',
            state: 'Rwanda',
            city: 'Kigali',
            address: 'KK 1 st',
            type: '3 bedroom',
            created_on: '2019-07-07T17:39:17+02:00',
            image_url:
              'https://res.cloudinary.com/mucyomiller/image/upload/v1562518550/apartment1_hemjm4.jpg'
          }
        };
      });
      done();
    });
  });

  describe('Middlewares', () => {
    it('it should return valids response depending input given', done => {
      const nextSpy = sinon.spy();
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const schema = Joi.object().keys({
        owner: Joi.number().integer(),
        price: Joi.number().min(0),
        state: Joi.string().min(2),
        city: Joi.string().min(2),
        address: Joi.string().min(2),
        type: Joi.string().min(3)
      });
      genericValidator(req, res, schema, nextSpy);
      // eslint-disable-next-line no-unused-expressions
      expect(nextSpy.calledOnce).to.be.true;
      genericValidator(req, res, schema, () => {
        expect(res).to.have.property('status');
      });
      done();
    });
  });
  describe('DELETE /', () => {
    it('it should return 200 status when delete operation was successful', done => {
      chai
        .request(app)
        .delete('/api/v1/property/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('data').be.a('object');
          res.body.should.have
            .property('data')
            .have.property('message')
            .be.a('string');
          done();
        });
    });

    it('it should return 404 with error when deletion fails', done => {
      chai
        .request(app)
        .delete('/api/v1/property/100')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error').be.a('string');
          done();
        });
    });
  });
});
