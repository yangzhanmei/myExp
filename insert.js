var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/', function (req, res) {

    var item = {
        "id": id++,
        "barcode": req.body.barcode,
        "name": req.body.name,
        "unit": req.body.unit,
        "price": req.body.price
    };
    if (!judgeDataType(item)) {

        fs.readFile('./User.json', function (err, data) {
            data = JSON.parse(data);

            data.push(item);
            fs.writeFile("./User.json", JSON.stringify(data), function (err) {
                if (err) {
                    res.send(err);
                }
                res.json(item);
                res.status(200).end();
            });
        });
    }
    else {
        res.status(400).end();
    }
});

function judgeDataType(data) {
    if (typeof (data.barcode) === undefined &&
        typeof (data.name) === undefined &&
        typeof (data.price) === undefined &&
        typeof (data.unit) === undefined &&
        typeof (data.barcode) != 'string' &&
        typeof (data.name) != 'string' &&
        typeof (data.price) != 'number' &&
        typeof (data.unit) != 'string') {

        return false;
    }
}

module.exports = app;