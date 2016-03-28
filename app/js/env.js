/**
 * @file 当前的执行环境
 * @author ielgnaw(wuji0223@gmail.com)
 */

var app = {
    env: '',
    agent: ''
};

// if (app.env === 'electron') {
//     window.$ = window.jQuery = require('../node_modules/jquery/dist/jquery.js');
// }
// else {
//     document.write('<script src="http://s1.bdstatic.com/r/www/cache/static/jquery/jquery-1.10.2.min_f2fb5194.js"><\/script>');
// }
if (window && window.process && window.process.type) {
    app.env = 'electron';
    window.$ = window.jQuery = require('../node_modules/jquery/dist/jquery.js');
}
else {
    app.env = 'browser';
}

import {readFileSync, writeFileSync} from 'fs';
if (app.env === 'electron') {
    console.warn(readFileSync);
    // window.$ = window.jQuery = require('./dep/jquery/1.9.1/src/jquery');
    // document.write('<script src="js/menu.js"><\/script>');
}
