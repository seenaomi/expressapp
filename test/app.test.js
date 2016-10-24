var chai = require('chai')
var assert = chai.assert;
var request = require('superagent');
var pg = require('pg');
var config = require('config');

describe('My App', function() {
    var myApp = require('../app.js');
    var port = 3000;
    var baseUrl = 'http://localhost:' + port;
    var conString = "postgres://" + config.get('db.user') + ":"
      + config.get('db.pass') + "@" + config.get('db.host')
      + "/" + config.get('db.name');


    before(function(done) {
        myApp.start(port, done);
    });

    after(function(done) {
        myApp.stop(done);
    });

    describe('When requested at /db', function () {
        it('should return 200 code', function (done) {
            request.get(baseUrl + "/db").end(function(err, res) {
                assert.equal(res.status, 200);
                done();
            });
        });
    });

    describe('When requested at /db', function () {
        it('should return message from db where id = 1', function (done) {
            request.get(baseUrl + "/db").end(function(err, res) {
                getMessage(1, function(msg) {
                    assert.equal(res.text, msg);
                    done();
                });
            });
        });
    });

    function getMessage(id, next){
        pg.connect(conString, function(err, client, done){
            if(err) {
                next(undefined);
            }
            else {
                client.query("select * from message where id = '" + id + "'", function(err, result) {
                    if(err) {
                        next(undefined);
                    }
                    else{
                        next(result.rows[0].msg);
                    }
                });
            }
            done();
        });
    };
});
