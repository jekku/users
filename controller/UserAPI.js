'use strict';

import * as UserService from '../service/UserService';
import {default as Validator} from 'validatorjs';
import {parallel as parallelize, forEach} from 'async';

export const registerUser = (req, res) => {
    const inputRules = {
        username: 'required|between:4,36',
        password: 'required|between:8,128',
        first_name: 'required|between:2,50',
        last_name: 'required|between:2,50',
        email_address: 'required|email'
    };
    const userValidation = new Validator(req.body, inputRules);

    function validateUserData () {
        if (userValidation.fails()) {
           return res.status(400).send(userValidation.errors);
        }

        parallelize(
            [checkUsernameExistence, checkEmailExistence],
            verifyUniqueIdentifiers
        );
    }

    function checkUsernameExistence (callback) {
        UserService.getUserByUsername(req.body.username, callback);
    }

    function checkEmailExistence (callback) {
        UserService.getUserByEmail(req.body.email_address, callback);
    }

    function verifyUniqueIdentifiers (err, result) {
        if (err) {
            return res.send({
                message: 'We had trouble checking if your username or email exists. Please try again later.'
            });
        }

        if (result[0] || result[1]) {
            return res.status(400)
              .send({message: 'Email or username is already taken'});
        }

        addNewUser();
    }

    function addNewUser () {
        UserService.addNewUser(req.body, sendFinalResponse);
    }

    function sendFinalResponse (err, result) {
        if (err) {
            return res.status(500)
              .send({'message': 'We had trouble completing your registration'});
        }

        res.send({message: 'Successfully registered'});
    }

    validateUserData();
};

