'use strict';

import {default as mysql} from 'anytv-node-mysql';
import {default as User} from '../model/User';

export const addNewUser = (fields, callback) => {
    function buildAndAddUser () {
        const user = new User(fields);
        user.buildAuthProtection();

        mysql.use('app_db')
          .query(
              `
                  INSERT INTO users(
                      id,
                      username,
                      password,
                      salt,
                      first_name,
                      last_name,
                      email_address
                  )
                  VALUES (
                      ?, ?, ?, ?, ?, ?, ?
                  )
              `,
              [
                  user.id,
                  user.username,
                  user.password,
                  user.salt,
                  user.first_name,
                  user.last_name,
                  user.email_address
              ],
              verifyInsert
          ).end();
    }

    function verifyInsert (err, result) {
        if (err) {
            return callback(err);
        }

        callback();
    }

    buildAndAddUser();
};

export const getUserByUsername = (username, callback) => {
    function searchUsername () {
        mysql.use('app_db')
          .query(
              `
                  SELECT *
                  FROM users
                  WHERE username = ?
              `,
              [username],
              returnSingleUser.bind(null, callback)
          ).end();
    }

    searchUsername();
};

export const getUserByEmail = (email, callback) => {
    function searchEmail () {
        mysql.use('app_db')
          .query(
              `
                  SELECT *
                  FROM users
                  WHERE email_address = ?
              `,
              [email],
              returnSingleUser.bind(null, callback)
          ).end();
    }

    searchEmail();
};

function returnSingleUser (callback, err, result) {
    if (err) {
        return callback(err);
    }

    if (!result.length) {
        return callback();
    }

    callback(null, new User(result[0]));
}

