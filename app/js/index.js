/**
* @file 入口
* @author ielgnaw(wuji0223@gmail.com)
*/

$(document).ready(function () {

    var util = require('./js/util');

    var inputNode = $('.input-wrapper input');
    var inputIconNode = $('.input-wrapper i');
    var webViewNode = $('#article-webview')[0];
    var loaderNode = $('.loader');
    var maskNode = $('.webview-mask');

    var isValidURL = false;

    var lastUrl = '';

    /**
     * 显示 loader 以及 mask
     */
    function showLoading() {
        loaderNode.show();
        maskNode.show();
    }

    /**
     * 隐藏 loader 以及 mask
     */
    function hideLoading() {
        loaderNode.hide();
        maskNode.hide();
    }

    /**
     * input focus 回调
     *
     * @param {Object} e 事件对象
     */
    function inputFocus(e) {
        e.stopPropagation();
        e.preventDefault();
        inputIconNode.css('opacity', 0.4);
    }

    /**
     * input blur 回调
     *
     * @param {Object} e 事件对象
     */
    function inputBlur(e) {
        e.stopPropagation();
        e.preventDefault();
        inputIconNode.css('opacity', 0);
        renderWebView();
    }

    /**
     * input keypress 回调
     *
     * @param {Object} e 事件对象
     */
    function inputKeypress(e) {
        if (e.keyCode === 13) {
            renderWebView();
        }
    }

    /**
     * 渲染 webView
     */
    function renderWebView() {
        isValidURL = false;
        hideLoading();
        console.warn('renderWebView');

        var url = inputNode.val().trim();
        if (!url) {
            return;
        }

        if (!util.hasProtocol(url)) {
            url = url.replace(util.URL_PROTOCOL_REG, '');
            url = 'http://' + url;
        }

        var curUrl = webViewNode.getURL();
        console.warn(curUrl, lastUrl, url);
        if (curUrl.replace(/\/$/, '') === lastUrl.replace(/\/$/, '')) {
            return;
        }

        webViewNode.src = 'about:blank';
        if (util.checkUrl(url)) {
            isValidURL = true;
            webViewNode.src = url;
        }
        else {
            isValidURL = false;
            webViewNode.src = ''
                // + 'data:text/plain,'
                + 'data:text/html;charset=utf-8,'
                + '<div style="color:red;">请输入合法的 URL 地址</div>';
        }
    }

    // efe.baidu.com/blog/text-truncating/

    /**
     * 初始化，绑定一些 dom 事件
     */
    function init() {
        inputNode.on('focus', inputFocus);
        inputNode.on('blur', inputBlur);
        inputNode.on('keypress', inputKeypress);

        webViewNode.src = 'about:blank';

        webViewNode.addEventListener('did-start-loading', function (e) {
            console.warn('did-start-loading');
            if (isValidURL) {
                showLoading();
            }
        });

        webViewNode.addEventListener('did-stop-loading', function () {
            hideLoading();
            isValidURL = false;
        });

        webViewNode.addEventListener('did-fail-load', function (e) {
            webViewNode.src = ''
                // + 'data:text/plain,'
                + 'data:text/html;charset=utf-8,'
                + '<div style="color:red;">请输入合法的 URL 地址</div>';
            hideLoading();
            isValidURL = false;
        });

        webViewNode.addEventListener('ipc-message', function (e) {
            var data = e.args[0];
            lastUrl = data.protocol + '//' + data.host + data.pathname;
            console.error(lastUrl);
            console.error(data);
            // window.location.protocol + '//' + window.location.host + window.location.pathname
            // console.log(data.location.protocol);
            // console.log(data.location.port);
        });
    }

    init();

    // var webview = document.getElementById('article-webview');
    // var indicator = document.querySelector('.indicator');

    // var loadstart = function () {
    //     indicator.innerText = "loading...";
    // }
    // var loadstop = function() {
    //     indicator.innerText = "";
    // }
    // webview.addEventListener("did-start-loading", loadstart);
    // webview.addEventListener("did-stop-loading", loadstop);
});


// module.exports = (function () {
//     var exports = {};
//     console.warn(3);

//     exports.init = function () {
//         console.warn('init');
//     };

//     return exports;
// })();

// var exports = module.exports;

// exports.init = function () {
//     console.warn($);
//     // console.warn(require);
//     // console.warn(require('./js/util'));
//     // console.warn('init');
//     // console.warn(util);
//     // console.warn(window);
// };

// exports.init();
