var express = require('express');
var config = require('config');
var pg = require('pg');

var app = express();
var server;
var conString = "postgres://" + config.get('db.user') + ":"
  + config.get('db.pass') + "@" + config.get('db.host')
  + "/" + config.get('db.name');


var start = exports.start = function start(port, callback) {
    server = app.listen(port, callback);
};

var stop = exports.stop = function stop(callback) {
    server.close(callback);
};

app.get('/', function sendResponse(req,res) {
    res.status(200).send('Hello World!');
});

app.get('/db', function sendResponse(req,res) {
    getMessage(1, function(err, msg) {
        if(err){
            res.status(404).send("404: Error talking to database " + err);
        }
        else{
            res.status(200).send(msg);
        }
    });
});

app.get('/config', function sendResponse(req,res) {
    res.json({"db.host": config.get('db.host'),
        "db.port": config.get('db.port'),
        "db.name": config.get('db.name'),
        "db.user": config.get('db.user'),
        "db.pass": config.get('db.pass'),
    });
});

function getMessage(id, next) {
    pg.connect(conString, function(err, client, done){
        if(err) {
            next(err, undefined);
        }
        else{
            client.query("select * from message where id='" + id + "'", function(err, result) {
                if(err) {
                    next(err, undefined);
                }
                else {
                    next(undefined, result.rows[0].msg);
                }
            });
        }
    });
};

