DROP DATABASE IF EXISTS user_app;
CREATE DATABASE user_app;

USE user_app;

/*
    RULES:

    For any table, it must have:
        - date_created
        - date_updated
    For tracking reasons

    Use InnoDB to avoid full table level locks
*/

/*
    Use UUID for ID to guarantee uniqueness.
    username arbitrary max length set to 36.
    sha256 password is always 64 in length.
    Max email address length is 254.
 */

CREATE TABLE users (
    id varchar(36) NOT NULL PRIMARY KEY,
    username varchar(36) NOT NULL UNIQUE,
    password varchar(64) NOT NULL,
    salt varchar(64) NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email_address varchar(254) NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    date_updated DATETIME DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

