var chai = require('chai')
var assert = chai.assert;
var request = require('superagent');
var pg = require('pg');
var config = require('config');

describe('DB Test', function() {
  var conString = "postgres://" + config.get('db.user') + ":"
      + config.get('db.pass') + "@" + config.get('db.host')
      + "/" + config.get('db.name');

  describe('Test the connection to the DB', function () {
    it('should connect to the DB', function (done) {
      pg.connect(conString, function(err, client, db_done) {
        if(err) {
          assert.equal("can-connect", "did-not-connect");
        }
        else {
          assert.equal("can-connect","can-connect");
        }
        db_done(done());

      });
    });
  });
});
