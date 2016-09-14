'use strict';

import {default as User} from '../../../model/User';
import * as PasswordHelper from '../../../helpers/PasswordHelper';

export default function () {
    const userInvokedWithoutID = new User({
        email_address: 'jekripreclaroorlina@gmail.com',
        username: 'user',
        password: 'user', //still in plaintext received from external source.
        first_name: 'Mary Cibyl Claire',
        last_name: 'Atacador'
    });

    const oldUser = new User({
        id: '7221d1b0-6a59-4b8d-a12b-1dfc1ea1bd97',
        email_address: 'jekripreclaroorlina@gmail.com',
        username: 'user',
        password: '62b4d3a2b2b62a454180db541b9d7908be0d7b91d952a5f7ed6d3ba3b60eb9af',
        salt: 'DFcbYnr3fmpthAYGAFWn6RhEvl4VTL0vgf1TT1QVnbwwbTDmom1vOLM6GI17pXEr',
        first_name: 'Mary Cibyl Claire',
        last_name: 'Atacador'
    });

    describe('User Model', () => {
        it('User model initally without UUID should be given one', (done) => {
            userInvokedWithoutID.should.have.property('id').with.lengthOf(36);

            done();
        });

        it('A new user should be given a salt and encrypted password', (done) => {
            userInvokedWithoutID.buildAuthProtection();
            const assignedSalt = userInvokedWithoutID.salt;
            const assignedPassword = userInvokedWithoutID.password;

            // previosuly assigned password in plain text is passed in
            PasswordHelper.encrypt('user', assignedSalt).should.be.exactly(assignedPassword);

            done();
        });

        it('Users that have been assigned ids should not receive new ones on Model Injection', (done) => {
            oldUser.id.should.be.exactly('7221d1b0-6a59-4b8d-a12b-1dfc1ea1bd97');
            done();
        });

        it('Users that have been assigned salt and password should not receive new ones on Model Injection', (done) => {
            oldUser.buildAuthProtection();
            oldUser.salt.should.be.exactly('DFcbYnr3fmpthAYGAFWn6RhEvl4VTL0vgf1TT1QVnbwwbTDmom1vOLM6GI17pXEr');
            oldUser.password.should.be.exactly('62b4d3a2b2b62a454180db541b9d7908be0d7b91d952a5f7ed6d3ba3b60eb9af');
            done();
        });
    });
};

