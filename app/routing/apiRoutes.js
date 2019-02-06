const path = require("path");

// load friend information
let friendData = require(path.join(__dirname, "../data/friends"));

// routing export
function apiRoutes(app) {
    app.get('/api/friends', function (req, res) {
        return res.json(friendData);
    });

    // survey route
    app.post('/api/friends', function (req, res) {
        let newUser = req.body;
        const parseInfo = newUser.scores.map(element => parseInt(element));
        newUser.scores = parseInfo;

        // check difference and store in array
        let differenceArray = [];

        // compare results with friends
        friendData.forEach(
            (friend, friendIndex) => differenceArray.push(totalDifference(newUser, friend, friendIndex))
        );

        // the less diferences is the best match
        matching = differenceArray.sort((a, b) => a.diff - b.diff)[0].friendIndex;

        bestResult = friendData[matching];

        friendData.push(newUser);

        // return the best result
        return res.send(bestResult);
    });
};

function totalDifference(userNew, friend, friendIndex) {
    // array to determine the differences between the user and friends.
    let friendDifference = userNew.scores.map((score, index) => Math.abs(score - friend.scores[index]));
    // addition to obtain totals
    let totalDifference = friendDifference.reduce((a, b) => a + b, 0);

    return {
        name: friend.name,
        friendIndex: friendIndex,
        diff: totalDifference,
    }
}

module.exports = apiRoutes;