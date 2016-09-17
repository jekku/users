'use strict';

import * as UserService from '../service/UserService';
import {default as Validator} from 'validatorjs';
import {parallel as parallelize, forEach} from 'async';
import {default as User} from '../model/User';

export const registerUser = (req, res) => {
    const inputRules = {
        username: 'required|between:4,36',
        password: 'required|between:4,128',
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

        if (!result[0] && !result[1]) {
            return addNewUser();
        }

        res.status(400)
            .send({message: 'Email or username is already taken'});
    }

    function addNewUser () {
        UserService.addNewUser(req.body, sendFinalResponse);
    }

    function sendFinalResponse (err, result) {
        if (err) {
            return res.status(500)
              .send({message: 'We had trouble completing your registration'});
        }

        res.send({message: 'Successfully registered'});
    }

    validateUserData();
};

export const login = (req, res) => {
    const inputRules = {
        username: 'required|between:4,36',
        password: 'required|between:4,128'
    };
    const loginValidation = new Validator(req.body, inputRules);

    function validateLoginCredentials () {
        if (loginValidation.fails()) {
           return res.status(400).send(loginValidation.errors);
        }

        UserService.getUserByUsername(req.body.username, compareProvidedAuthentication);
    }

    function compareProvidedAuthentication (err, result) {
        if (err) {
            return res.status(500)
              .send({message: 'Please try again later'});
        }

        if (!result) {
            return res.status(400)
              .send({message: 'This username does not exist'});
        }

        const userToCompare = new User(req.body);
        userToCompare.salt = result.salt;
        userToCompare.encryptPassword();

        if (userToCompare.password === result.password) {
            delete result.password;
            delete result.salt;
            req.session.user = result;

            return res.send({
                message: 'Successfully logged in',
                data: req.session.user
            });
        }

        res.status(400)
          .send({message: 'Invalid username and password combination'});
    }

    validateLoginCredentials();
};

export const logout = (req, res) => {
    req.session.destroy();
    res.send({message: 'Successfully logged out'});
};

export const getUserProfile = (req, res) => {
    res.send(req.session.user);
};

