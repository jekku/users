import {default as request} from 'supertest';
import {default as config} from './../../config/config';
import {default as should} from 'should';

const api = request('http://localhost:' + config.PORT);
const userApiRoot = '/api/user';
const requiredFields = [
  'username',
  'password',
  'first_name',
  'last_name',
  'email_address'
];

const sampleUser = {
    username: 'newUsername',
    password: 'newPassword',
    email_address: 'someEmail@email.net',
    first_name: 'Jekri',
    last_name: 'Orlina'
};

describe('User API', () => {
    describe('Registration module', () => {
        it('Should not allow missing required fields', (done) => {
            api.post(`${userApiRoot}/register`).expect(400)
              .end((err, res) => {
                  should.not.exist(err);

                  const response = JSON.parse(res.text);
                  const missingFields = Object.keys(response.errors);

                  missingFields.forEach((field) => {
                      requiredFields.indexOf(field).should.not.be.exactly(-1);
                  });

                  done();
              });
        });

        it('Should register a unique user', () => {
            api.post(`${userApiRoot}/register`)
              .type('form')
              .send(sampleUser)
              .expect(200)
              .end((err, res) => {
                  const response = JSON.parse(res.text);
                  response.message.should.be.exactly('Successfully registered');
              });
        });

        it('Should not allow registration of existing Email and Username', (done) => {
            api.post(`${userApiRoot}/register`)
              .type('form')
              .send(sampleUser)
              .expect(400)
              .end((err, res) => {
                  const response = JSON.parse(res.text);
                  response.message.should.be.exactly('Email or username is already taken');
                  done();
              });
        });
    });
});

