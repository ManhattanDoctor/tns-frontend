import * as buffer from 'buffer';
import * as process from 'process';
import 'reflect-metadata'
import 'zone.js';

var global = global || window;
global.Buffer = global.Buffer || buffer.Buffer;
global.process = global.process || process;
