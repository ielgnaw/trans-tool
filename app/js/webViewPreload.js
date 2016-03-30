
var ipcRenderer = require('electron').ipcRenderer;

document.addEventListener('DOMContentLoaded', function (e) {
    console.warn(e);
// window.addEventListener('load', function () {
    var location = window.location;
    ipcRenderer.sendToHost('webview-window-data', {
        title: document.title,
        href: location.href,
        origin: location.origin,
        protocol: location.protocol,
        host: location.host,
        pathname: location.pathname,
        e: e
    });
});