var mysql = require('mysql');
var config = require('../configDB');
var con = mysql.createConnection(config.database);

module.exports = function(req, res){
  con.connect(function(err) {
    con.query("SELECT natjecaji.id AS id, naslov, datum_vrijeme, COUNT(prijave.korisnik_id) AS count FROM natjecaji LEFT JOIN prijave ON prijave.natjecaj_id = natjecaji.id WHERE tvrtka_fk = ? GROUP BY natjecaji.id;", req.session.podaci.id, function(err, result){
        res.render('mojiNatjecaji', {
        session: req.session.podaci,
        result: result
      });
    });
  });
}
