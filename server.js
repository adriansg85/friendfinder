require("dotenv").config();

// Load dependencies
var express = require("express");
var path = require("path");

// express app
var app = express();
PORT = process.env.PORT || 3000;

app.use(express.static("app/publicassets"));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// routing
htmlRoutes = require(path.join(__dirname, 'app/routing/htmlRoutes'));
apiRoutes = require(path.join(__dirname, 'app/routing/apiRoutes'));

// add express app to routes
htmlRoutes(app);
apiRoutes(app);

// server start
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});