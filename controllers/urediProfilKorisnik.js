var mysql = require('mysql');
var config = require('../configDB');
var con = mysql.createConnection(config.database);

module.exports = function(req, res){
  if(req.session.podaci.korisnik || req.session.podaci.admin){
    con.connect(function(err) {
      if (err) {console.log("Greska")};
      console.log("Spojen na bazu");
      con.query("SELECT * FROM korisnik WHERE email=?;",[req.session.podaci.email], function (err, result, fields) {
        console.log("Korisnik " + result[0].ime + " " + result[0].prezime + " uredjuje svoj profil.");
        var imePrezime = result[0].ime + " " + result[0].prezime;
        var email = req.session.podaci.email;
        console.log(email);
        var insert  = {ime: req.body.ime, prezime: req.body.prezime, spol: req.body.spol, godina_rodjenja: req.body.datum_rodjenja, adresa: req.body.adresa, mjesto: req.body.mjesto, strucna_sprema: req.body.strucna_sprema, naziv_obrazovanja: req.body.naziv_obrazovanja, kontakt_telefon:req.body.kontakt_telefon};
        con.query("UPDATE korisnik SET ? WHERE email = ?",[insert, email], function (err, result) {
          console.log(err);
          console.log("Korisnik " + imePrezime + " je uredio svoj profil.");
          con.query("SELECT * FROM korisnik WHERE email=?;",[req.session.podaci.email], function (err, result, fields) {
            if(err)console.log(err);
            console.log(result);
            if(req.session.podaci.korisnik){
              var korisnik = true;
              var admin = false;
            }
            else{
              var korisnik = false;
              var admin = true;
            }
            req.session.podaci = {
              kid: result[0].id,
              ime: result[0].ime,
              prezime: result[0].prezime,
              adresa: result[0].adresa,
              godina_rodjenja: result[0].godina_rodjenja,
              mjesto: result[0].mjesto,
              kontakt_telefon: result[0].kontakt_telefon,
              strucna_sprema: result[0].strucna_sprema,
              naziv_obrazovanja: result[0].naziv_obrazovanja,
              email: result[0].email,
              spol: result[0].spol,
              slika: result[0].slika,
              korisnik: korisnik,
              admin: admin
            };
            res.redirect('/mojProfilKorisnik');
          });
        });
      });
    });
  }
};
