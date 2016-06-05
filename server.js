var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.use(bodyParser.json());

global.id = 1;

fs.exists("./User.json", function (exists) {
    if (!exists) {
        fs.createWriteStream("./User.json", {encoding: "utf8"});
        fs.writeFile('User.json', '[]');
    }
    else {
        fs.readFile('User.json', 'utf8', function (err, data) {
            data = JSON.parse(data);
            var temp = getTemp(data);

            global.id = temp + 1;
        })
    }
});

function getTemp(data) {
    var temp = 1;

    for (var i = 0; i < data.length; i++) {

        if (data[i].id > temp) {
            temp = data[i].id;
        }
    }

    return temp;
}

var insertItem = require('./insert');
var deleteItem = require('./delete');
var updateItem = require('./update');
var selectItem = require('./select');

app.use('/insertItem', insertItem);
app.use('/deleteItem', deleteItem);
app.use('/updateItem', updateItem);
app.use('/selectItem', selectItem);

app.listen(8080);

module.exports = app;