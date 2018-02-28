var mysql = require('mysql');
var bcrypt = require('bcrypt');
var config = require('../configDB');
var con = mysql.createConnection(config.database);
module.exports = function(req, res){
  console.log("ASD");
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
            var insert  = {naziv: req.body.naziv, email: req.body.email, broj_telefona: req.body.brojTelefona, slika: "tvrtkaDefault.png"};
            var sql = "INSERT INTO tvrtka SET ?";
            con.query(sql, insert, function (err, result) {
              if (err) console.log(err);
              bcrypt.hash(req.body.lozinka, 10, function(err, hash) {
                var sql = "UPDATE tvrtka SET lozinka = ? WHERE email = ?";
                con.query(sql,[hash, req.body.email],function (err, result) {
                  if (err) console.log(err);
                  con.query("SELECT * FROM tvrtka WHERE email=?;",[req.body.email], function (err, result, fields) {
                    if (err) console.log(err);
                    req.session.podaci = {
                      ime: result[0].naziv,
                      id:result[0].id,
                      email: result[0].email,
                      adresa: result[0].adresa,
                      mjesto: result[0].mjesto,
                      kontakt_telefon: result[0].broj_telefona,
                      slika: result[0].slika,
                      tvrtka: true
                    };
                    req.podaci= "";
                    req.korisnikPostoji= false;
                    res.redirect('/');
                  });
                });
              });
              console.log("1 tvrtka inserted");
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
