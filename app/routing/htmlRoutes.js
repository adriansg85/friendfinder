const path = require('path');

// html routes
function htmlRoutes(app) {

    // go to main page
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/home.html'));
    });

    // go to survey page
    app.get('/survey', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/survey.html'));
    });
};

module.exports = htmlRoutes;