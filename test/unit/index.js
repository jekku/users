'use strict';

import {default as PasswordHelperTest} from './helpers/PasswordHelper';
import {default as UserModelTest} from './model/User';
import {default as UserDaoTest} from './dao/UserDao';

export default function () {
    PasswordHelperTest();
    UserModelTest();
    UserDaoTest();
};

