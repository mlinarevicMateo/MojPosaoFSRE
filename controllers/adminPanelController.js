var mysql = require('mysql');
var config = require('../configDB');
var con = mysql.createConnection(config.database);

module.exports = function(req,res){
    if(req.session.podaci.admin){
        con.connect(function(err){
          console.log("Spojen na bazu adasdsad");
          con.query("SELECT * FROM korisnik", function(err,result){
            var korisnici = result;
            con.query("SELECT * FROM tvrtka", function(err, result){
              var tvrtka = result;
              con.query("SELECT natjecaji.id AS id, naslov, text_natjecaja, datum_vrijeme, tvrtka.id AS tvrtka_fk, naziv, email, broj_telefona, mjesto, lozinka, slika, adresa FROM natjecaji INNER JOIN tvrtka ON natjecaji.tvrtka_fk = tvrtka.id ORDER BY natjecaji.datum_vrijeme DESC;", function(err, result){
                var natjecaji = result;
                con.query("SELECT natjecaj_id AS id, naslov, datum_vrijeme, COUNT(korisnik_id) AS count FROM prijave INNER JOIN natjecaji ON prijave.natjecaj_id = natjecaji.id GROUP BY natjecaj_id", function(err, result){
                  var suma = 0;
                  for(var i in result){
                    suma += result[i].count;
                  }
                  res.render('admin',{
                    layout: false,
                    korisnici: korisnici,
                    tvrtka: tvrtka,
                    natjecaji: natjecaji,
                    prijave: result,
                    suma_prijava: suma
                  });
                });
              });
          });
          });
        });
    }
}
""
