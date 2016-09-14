'use strict';

process.env.NODE_ENV = 'test';

import {default as RunUnitTests} from './unit/';
import {default as RunApiTests} from './api/';
import {default as server} from '../server';

RunUnitTests();

