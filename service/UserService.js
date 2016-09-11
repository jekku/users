'use strict';

import * as UserDao from '../dao/UserDao';

export const addNewUser = (fields, callback) => {
    UserDao.addNewUser(fields, callback);
};

export const getUserByUsername = (username, callback) => {
    UserDao.getUserByUsername(username, callback);
};

export const getUserByEmail = (email, callback) => {
    UserDao.getUserByEmail(email, callback);
};

