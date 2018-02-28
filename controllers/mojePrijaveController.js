var mysql = require('mysql');
var config = require('../configDB');
var con = mysql.createConnection(config.database);

module.exports = function(req, res){
  con.connect(function(err) {
    con.query("SELECT naziv, naslov, natjecaji.id AS nid FROM prijave INNER JOIN natjecaji ON prijave.natjecaj_id = natjecaji.id INNER JOIN tvrtka ON natjecaji.tvrtka_fk = tvrtka.id WHERE korisnik_id = ?;", req.session.podaci.kid, function(err, result){
      res.render('mojePrijave', {
        session: req.session.podaci,
        result: result
      });
    });
  });
}
