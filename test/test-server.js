'use strict';

process.env.NODE_ENV = 'test';

import {default as RunUnitTests} from './unit/';
import {default as server} from '../server';

RunUnitTests();

