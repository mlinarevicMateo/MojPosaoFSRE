var mysql = require('mysql');
var config = require('../configDB');
var bcrypt = require('bcrypt');
var con = mysql.createConnection(config.database);

module.exports = function(req, res){
  con.connect(function(err) {
  if (err) {console.log("Greska")};
  console.log("Spojen na bazu");
  con.query("SELECT COUNT(*) AS Count FROM korisnik WHERE email=?;",[req.body.email], function (err, result, fields) {
    if (err) console.log(err);
    if(result[0].Count === 0){
      con.query("SELECT COUNT(*) AS Count FROM tvrtka WHERE email=?;",[req.body.email], function (err, result, fields) {
        if (err) console.log(err);
        if(result[0].Count === 0){
          console.log("Nema korisnika u bazi.");
          res.render('login', {
            layout: false,
            session: "nemaKorisnika",
            nemaKorisnika: true
          });
        }
        else{
          console.log("Tvrtka");
          con.query("SELECT * FROM tvrtka WHERE email=?;",[req.body.email], function (err, result, fields) {
              var podaci = {
                ime: result[0].naziv,
                id:result[0].id,
                email: result[0].email,
                adresa: result[0].adresa,
                mjesto: result[0].mjesto,
                kontakt_telefon: result[0].broj_telefona,
                slika: result[0].slika,
                tvrtka: true
              };
            bcrypt.compare(req.body.password.toString(), result[0].lozinka, function(err, result) {
              if(result){
                req.session.podaci = podaci;
                req.netocnaLozinka = false;
                res.redirect('/natjecaji/1');
              }
              else{
                res.render('login', {
                  layout: false,
                  session: "netocnaLozinka",
                  netocnaLozinka: true
                });
              }
            });
          });
        }
      });
    }
    else{
      console.log("Korisnik");
      con.query("SELECT * FROM korisnik WHERE email=?;",[req.body.email], function (err, result, fields) {
        if (result[0].admin){
          var admin = true;
          var ime = result[0].ime;
          var prezime = result[0].prezime;
           var podaci = {
             admin: admin,
             ime: ime,
             kid: result[0].id,
             prezime: prezime,
             adresa: result[0].adresa,
             godina_rodjenja: result[0].godina_rodjenja,
             mjesto: result[0].mjesto,
             kontakt_telefon: result[0].kontakt_telefon,
             strucna_sprema: result[0].strucna_sprema,
             naziv_obrazovanja: result[0].naziv_obrazovanja,
             email: req.body.email,
             spol: result[0].spol,
             slika: result[0].slika
           };
        }
        else{
          var korisnik = true;
          var ime = result[0].ime;
          var prezime = result[0].prezime;
          var podaci = {
            ime: ime,
            kid: result[0].id,
            prezime: prezime,
            adresa: result[0].adresa,
            godina_rodjenja: result[0].godina_rodjenja,
            mjesto: result[0].mjesto,
            kontakt_telefon: result[0].kontakt_telefon,
            strucna_sprema: result[0].strucna_sprema,
            naziv_obrazovanja: result[0].naziv_obrazovanja,
            email: req.body.email,
            spol: result[0].spol,
            slika: result[0].slika,
            korisnik: korisnik
          };
        }
        bcrypt.compare(req.body.password.toString(), result[0].lozinka, function(err, result) {
          if(result){
            req.session.podaci = podaci;
            req.netocnaLozinka = false;
            res.redirect('/natjecaji/1');
          }
          else{
            res.render('login', {
              layout: false,
              session: "netocnaLozinka",
              netocnaLozinka: true
            });
          }
        });
      });
    }
  });
});

}
