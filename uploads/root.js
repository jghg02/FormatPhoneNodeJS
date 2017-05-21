/**
 * Created by jhgonzalez on 5/20/17.
 */
var path = require('path');

module.exports = (function () {
    return path.dirname(require.main.filename || process.mainModule.filename);
})();