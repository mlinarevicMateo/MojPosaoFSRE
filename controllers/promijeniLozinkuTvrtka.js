var mysql = require('mysql');
var config = require('../configDB');
var bcrypt = require('bcrypt');
var con = mysql.createConnection(config.database);

module.exports = function(req, res){
  con.connect(function(err){
     con.query("SELECT lozinka FROM tvrtka WHERE email=?;",[req.session.podaci.email], function (err, result, fields) {
       bcrypt.compare(req.body.staraLozinka.toString(), result[0].lozinka, function(err, result) {
         if(result){
           if(req.body.novaLozinka === req.body.novaLozinkaPon){
             bcrypt.hash(req.body.novaLozinka, 10, function(err, hash){
               con.query("UPDATE tvrtka SET lozinka = ? WHERE email = ?",[hash, req.session.podaci.email], function (err, result, fields) {
                 if(err) console.log(err);
                 else{
                   res.render('mojProfilTvrtka', {
                     layout: false,
                     session: req.session.podaci,
                     neispravnaPonovljenaLozinka: false,
                     neispravnaStaraLozinka: false
                   });
                 }
               });
             });
           }else{
             res.render('mojProfilTvrtka', {
               layout: false,
               session: req.session.podaci,
               neispravnaPonovljenaLozinka: true
             });
           }
         }else{
           res.render('mojProfilTvrtka', {
             layout: false,
             session: req.session.podaci,
             neispravnaStaraLozinka: true
           });
         }
       });
     });
  });
};
