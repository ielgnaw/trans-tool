/**
 * @file 工具函数
 * @author ielgnaw(wuji0223@gmail.com)
 */


var strUrlReg = ''
    + '^((https|http|ftp|rtsp|mms)?://)'
    + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' // ftp 的 user@
    + '(([0-9]{1,3}\.){3}[0-9]{1,3}' // ip 的格式
    + '|' // 允许 ip 和 domain
    + '([0-9a-z_!~*\'()-]+\.)*' // 域名- www.
    + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.' // 二级域名
    + '[a-z]{2,6})' // first level domain- .com or .museum
    + '(:[0-9]{1,4})?' // 端口- :80
    + '((/?)|' // a slash isn't required if there is no file name
    + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';

// var URL_REG = new RegExp(strUrlReg);
var URL_REG = /(https?|ftp):\/\/([-\w\.]+)+(:\d+)?(\/([:\(\)~\w\/_\.\,\'\#\-\=\%\@\;]*(\?\S+)?)?)?/;

// var URL_PROTOCOL_REG = /(^(https?|ftp):\/\/www\.)/;
var URL_PROTOCOL_REG = /(^(https?|ftp):)/;

var exports = {};

exports.URL_PROTOCOL_REG = URL_PROTOCOL_REG;

/**
 * 验证 url 是否有协议
 *
 * @param {string} url 待验证的 url 地址
 *
 * @return {boolean} 验证结果
 */

exports.hasProtocol = function (url) {
    return URL_PROTOCOL_REG.test(url);
};

/**
 * 验证是否是合格的 url
 *
 * @param {string} url 待验证的 url 地址
 *
 * @return {boolean} 验证结果
 */
exports.checkUrl = function (url) {
    return URL_REG.test(url);
};


module.exports = exports;