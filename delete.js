var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.delete('/:id', function (req, res) {
    var id = req.params.id;

    fs.readFile('User.json', 'utf8', function (err, data) {
        data = JSON.parse(data);

        if (err) {
            res.send(err);
        }
        else {
            var j = isExist(data, JSON.parse(id));

            if (j === null) {
                res.status(404).end();
            }
            else {
                data.splice(j, 1);
                fs.writeFile("./User.json", JSON.stringify(data), function (err) {
                    if (err) {
                        res.send(err);
                    }
                });
                res.status(204).end();
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