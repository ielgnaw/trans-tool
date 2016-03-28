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
    // window.$ = window.jQuery = require('./dep/jquery/1.9.1/src/jquery');
    // document.write('<script src="js/menu.js"><\/script>');
}
