var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.put('/:id', function (req, res) {
    var id = req.params.id;

    fs.readFile('User.json', 'utf8', function (err, data) {
        var data = JSON.parse(data);

        if (err) {
            res.send(err);
        }
        else {
            var j = isExist(data, JSON.parse(id));

            if (j === null) {
                res.status(404).end();
            }
            else {
                data[j] = {
                    "id": id,
                    "barcode": req.body.barcode,
                    "name": req.body.name,
                    "unit": req.body.unit,
                    "price": req.body.price
                };
                fs.writeFile("./User.json", JSON.stringify(data), function (err) {
                    if (err) {
                        res.send(err);
                    }
                });
                res.json(data[j]);
                res.status(200).end();
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