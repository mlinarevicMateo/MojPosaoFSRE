var mysql = require('mysql');
var config = require('../configDB');
var con = mysql.createConnection(config.database);

module.exports = function(req, res){
  con.connect(function(err) {
    con.query("SELECT k.ime, k.prezime, k.email, k.naziv_obrazovanja FROM prijave INNER JOIN korisnik k ON k.id = prijave.korisnik_id WHERE prijave.natjecaj_id = ?;", req.params.id, function(err, result){
      res.render('pogledajPrijave', {
        session: req.session.podaci,
        result: result
      });
    });
  });
}
