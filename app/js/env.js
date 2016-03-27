/**
 * @file 当前的执行环境
 * @author ielgnaw(wuji0223@gmail.com)
 */

var app = {
    env: '',
    agent: ''
};

if (window && window.process && window.process.type) {
    app.env = 'electron';
}
else {
    app.env = 'browser';
}

import {readFileSync, writeFileSync} from 'fs';
if (app.env === 'electron') {
    console.warn(readFileSync, 123);
}
