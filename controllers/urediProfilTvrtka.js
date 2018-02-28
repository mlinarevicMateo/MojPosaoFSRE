var mysql = require('mysql');
var config = require('../configDB');
var con = mysql.createConnection(config.database);

module.exports = function(req, res){
  if(req.session.podaci.tvrtka){
    con.connect(function(err) {
      if (err) {console.log("Greska")};
      console.log("Spojen na bazu");
      con.query("SELECT * FROM tvrtka WHERE email = ?", req.session.podaci.email, function(err, result){
        console.log("Tvrtka " + result[0].naziv + " uredjuje svoj profil.");
        var email = result[0].email;
        var insert = {naziv: req.body.naziv, adresa: req.body.adresa, mjesto: req.body.mjesto, broj_telefona: req.body.kontakt_telefon};
        con.query("UPDATE tvrtka SET ? WHERE email = ?", [insert, email], function(err, result){
          console.log(err);
          con.query("SELECT * FROM tvrtka WHERE email = ?", email, function(err, result){
            console.log(err);
            req.session.podaci = {
              ime: result[0].naziv,
              email: result[0].email,
              adresa: result[0].adresa,
              mjesto: result[0].mjesto,
              kontakt_telefon: result[0].broj_telefona,
              slika: result[0].slika,
              tvrtka: true
            };
            res.redirect('/mojProfilTvrtka');
          });
        });
      });
    });
  }
};
