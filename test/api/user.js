import {default as request} from 'supertest';
import {default as config} from './../../config/config';
import {default as should} from 'should';

const api = request('http://localhost:' + config.PORT);
const userApiRoot = '/api/user';

describe('User API', () => {
    describe('Registration module', registrationModuleTests);

    describe('Login module', () => {
        const validLogin = {
            username: 'javier_alcazar',
            password: 'user'
        };

        const wrongPassword = {
            username: 'javier_alcazar',
            password: 'yooser'
        };

        const wrongUsername = {
            username: 'jekri',
            password: 'password123'
        };

        it('Should allow login for valid users', (done) => {
            api.post(`${userApiRoot}/login`)
              .type('form')
              .send(validLogin)
              .expect(200)
              .end((err, res) => {
                  const response = JSON.parse(res.text);
                  response.message.should.be.exactly('Successfully logged in');

                  done();
              });
        });

        it('Should reject invalid username', (done) => {
            api.post(`${userApiRoot}/login`)
              .type('form')
              .send(wrongUsername)
              .expect(200)
              .end((err, res) => {
                  const response = JSON.parse(res.text);
                  response.message.should.be.exactly('This username does not exist');

                  done();
              });
        });

        it('Should reject invalid password', (done) => {
            api.post(`${userApiRoot}/login`)
              .type('form')
              .send(wrongPassword)
              .expect(200)
              .end((err, res) => {
                  const response = JSON.parse(res.text);
                  response.message.should.be.exactly('Invalid username and password combination');
                  done();
              });
        });
    });
});

function registrationModuleTests () {
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

    const existingUser = {
        username: 'javier_alcazar',
        password: 'plainText',
        email_address: 'javier@isr.ph',
        first_name: 'Javier',
        last_name: 'Alcázar'
    };

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
          .send(existingUser)
          .expect(400)
          .end((err, res) => {
              const response = JSON.parse(res.text);
              response.message.should.be.exactly('Email or username is already taken');
              done();
          });
    });
}
