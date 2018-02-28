var mysql = require('mysql');
var config = require('../configDB');
var con = mysql.createConnection(config.database);
module.exports = function(req, res){
  con.connect(function(err) {
  con.query("SELECT COUNT(id) AS count FROM natjecaji;", function(err, result){
    if(err) console.log(err);
    var count = result[0].count;
    con.query("SELECT natjecaji.id, naslov, text_natjecaja, datum_vrijeme, tvrtka.id AS tvrtka_fk, naziv, email, broj_telefona, mjesto, lozinka, slika, adresa FROM natjecaji INNER JOIN tvrtka ON natjecaji.tvrtka_fk = tvrtka.id ORDER BY natjecaji.id DESC;", function (err, result, fields) {
      if(err) console.log(err);
      if(!req.session.podaci){
        var vrati = req.params.page;
        var rezultat = result.slice((vrati-1)*10, vrati*10);
        return res.render('natjecaji', {
          result: rezultat,
          count: count
        });
      }else{
        var vrati = req.params.page;
        var rezultat = result.slice((vrati-1)*10, vrati*10);
        if(req.session.podaci.korisnik){
        con.query("SELECT natjecaj_id FROM prijave WHERE korisnik_id = ?", req.session.podaci.kid, function(err, result){
          var niz = [];
          for(var i of result){
            niz.push(i.natjecaj_id);
          }
          return res.render('natjecaji', {
            layout:false,
            session: req.session.podaci,
            result: rezultat,
            count: count,
            prijave: niz
          });
        });
      }else{
        return res.render('natjecaji', {
          layout:false,
          session: req.session.podaci,
          result: rezultat,
          count: count
        });
      }
      }
    });
  });
});
}
