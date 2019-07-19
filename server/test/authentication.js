// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import users from '../model/users';
import { initDB } from '../database/db_init';

chai.use(chaiHttp);
chai.should();
// eslint-disable-next-line no-unused-vars
const { expect, assert } = chai;
const [user1] = users;

describe('Authentications', () => {
  before(async () => {
    await initDB();
  });
  describe('SignUp', () => {
    it('it should add user if required fields provided', done => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send({
          first_name: 'test',
          last_name: 'tester',
          email: 'test@test.com',
          password: 'testpass',
          phone_number: '0722535706',
          address: 'Nyamirambo'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('data').be.a('object');
          res.body.should.have.property('data').have.property('token');
          done();
        });
    });

    it('it should return 400  when user fills bad inputs', done => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send({
          first_names: 'test'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('errors').be.a('array');
          done();
        });
    });
  });
  describe('SignIn', () => {
    it('it should sign in user if correct credentials provided', done => {
      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send({
          email: user1.email,
          password: 'c00lssap'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').be.a('string');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data').be.a('object');
          res.body.should.have.property('data').have.property('token');
          done();
        });
    }).timeout(5000);

    it('it should return 400  when user fills bad inputs', done => {
      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send({
          email: 'test@test.com',
          password: 'somebadpass'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('data').be.a('string');
          res.body.should.have.property('data').eql('invalid email or password');
          done();
        });
    });
  });
  describe('JWT', () => {
    it('it should return 401 if missing jwt token on authenticated route', done => {
      chai
        .request(app)
        .patch('/api/v2/property/1')
        .send({
          price: 100
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message').eql('Authentication failed!');
          done();
        });
    });
    it('it should return 400 if you jwt bad or malformatted jwt token', done => {
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU1Nzg3NzExNywiZXhwIjoxNTU3OTYzNTE3LCJhdWQiOiJodHRwczovL3lvdXJkb21haW4uY29tIiwiaXNzIjoiZmVhdGhlcnMiLCJzdWIiOiJhbm9ueW1vdXMiLCJqdGkiOiJkNDhjMDY1My01NDZjLTQ2N2EtYmU2Yi1iYmI2ZDgxNTc5NzcifQ.zlQIVtjBPC73AOUh_Gl1sCkNTS3SBonmoeSLzghHgok`;
      chai
        .request(app)
        .patch('/api/v2/property/1')
        .set('Authorization', `Bearer ${token}`)
        .send({
          price: 100
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          done();
        });
    });
  });
});
