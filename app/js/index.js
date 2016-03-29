/**
* @file 入口
* @author ielgnaw(wuji0223@gmail.com)
*/

$(document).ready(function () {

    var util = require('./js/util');

    var inputNode = $('.input-wrapper input');
    var inputIconNode = $('.input-wrapper i');
    var webViewNode = $('#article-webview');
    var loaderNode = $('.loader');
    var maskNode = $('.webview-mask');

    var isValidURL = false;

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
        console.warn(1312321);
        try {
        isValidURL = false;
        hideLoading();
        webViewNode.attr('src', 'about:blank');
        var url = inputNode.val().trim();
        if (util.checkUrl(url)) {
            console.warn(333);
            isValidURL = true;
            webViewNode.attr('src', url);
        }
        else {
            isValidURL = false;
            console.warn(3123);
            webViewNode.attr('src', ''
                // + 'data:text/plain,'
                + 'data:text/html;charset=utf-8,'
                + '<div style="color:red;">请输入合法的 URL 地址</div>'
            );
        }
        }
        catch (e) {
            console.warn(e);
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

        webViewNode.on('did-start-loading', function (e) {
            if (isValidURL) {
                showLoading();
            }
        });

        // webViewNode.on('did-stop-loading', function (e) {
        // webViewNode.on('load-commit', function (e) {
        webViewNode.on('dom-ready', function (e) {
            console.warn('dom-ready', e);
            hideLoading();
        });

        webViewNode.on('did-fail-load', function (e) {
            console.warn('did-fail-load', e);
            webViewNode.attr('src', ''
                // + 'data:text/plain,'
                + 'data:text/html;charset=utf-8,'
                + '<div style="color:red;">请输入合法的 URL 地址</div>'
            );
            hideLoading();
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
