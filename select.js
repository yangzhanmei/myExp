var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());


app.get('/', function (req, res) {

    fs.readFile("./User.json", 'UTF-8', function (err, data) {
        if (err) {
            res.send(err);
        }
        res.json(JSON.parse(data));
        res.status(200).end();
    });
});

app.get('/:id', function (req, res) {

    var id = req.params.id;

    fs.readFile('User.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        if (err) {
            res.send(err);
        }
        else {
            var j = isExist(data, JSON.parse(id));

            if (j == null) {
                res.status(404).end();
            }
            else {
                res.status(200).end();
                res.json(data[j]);
            }
        }
    })
});

function isExist(data, id) {
    for (var i = 0; i < data.length; i++) {

        if (id === data[i].id) {

            return i;
        }
    }

    return null;
}

module.exports = app;