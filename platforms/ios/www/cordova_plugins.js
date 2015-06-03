cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.initialxy.cordova.themeablebrowser/www/themeablebrowser.js",
        "id": "com.initialxy.cordova.themeablebrowser.themeablebrowser",
        "clobbers": [
            "cordova.ThemeableBrowser"
        ]
    },
    {
        "file": "plugins/com.verso.cordova.clipboard/www/clipboard.js",
        "id": "com.verso.cordova.clipboard.Clipboard",
        "clobbers": [
            "cordova.plugins.clipboard"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.initialxy.cordova.themeablebrowser": "0.2.6",
    "com.verso.cordova.clipboard": "0.1.0"
}
// BOTTOM OF METADATA
});