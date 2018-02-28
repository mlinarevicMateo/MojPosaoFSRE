var mysql = require('mysql');
var bcrypt = require('bcrypt');
var config = require('../configDB');
var con = mysql.createConnection(config.database);
module.exports = function(req, res){
  if(req.body.lozinka === req.body.lozinkaPon){
    con.connect(function(err) {
    if (err) {console.log("Greska")};
    console.log("Spojen na bazu");
    con.query("SELECT COUNT(*) AS Count FROM korisnik WHERE email=?;",[req.body.email], function (err, result, fields) {
      if (err) console.log(err);
      if(result[0].Count === 0){
        con.query("SELECT COUNT(*) AS Count FROM tvrtka WHERE email=?;",[req.body.email], function (err, result, fields) {
          if (err) console.log(err);
          if(result[0].Count === 0){
            var insert  = {ime: req.body.ime, prezime: req.body.prezime, email: req.body.email, slika:"myProfill-icon.jpeg"};
            var sql = "INSERT INTO korisnik SET ?";
            con.query(sql, insert, function (err, result) {
              if (err) console.log(err);
              bcrypt.hash(req.body.lozinka, 10, function(err, hash) {
                var sql = "UPDATE korisnik SET lozinka = ? WHERE email = ?";
                con.query(sql,[hash, req.body.email],function (err, result) {
                  if (err) console.log(err);
                  con.query("SELECT * FROM korisnik WHERE email=?;",[req.body.email], function (err, result, fields) {
                    if (err) console.log(err);
                    req.session.podaci = {
                      ime: result[0].ime,
                      kid: result[0].id,
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
                      korisnik: true,
                    };
                    console.log("Lozinka postavljena");
                    req.podaci= "";
                    req.korisnikPostoji= false;
                    res.redirect('/');
                  });
                });
              });
              console.log("1 korisnik inserted");
            });
          }
          else{
            res.render('registracija', {
              layout: false,
              podaci: req.body,
              session: "korisnikPostoji",
              korisnikPostoji: true
            });
          }
        });
      }
      else{
        res.render('registracija', {
          layout: false,
          podaci: req.body,
          session: "korisnikPostoji",
          korisnikPostoji: true
        });
      }
    });
  });
  }
}
