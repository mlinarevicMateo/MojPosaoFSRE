var mysql = require('mysql');
var config = require('../configDB');
var con = mysql.createConnection(config.database);

module.exports = function(req, podaci, res){
  con.connect(function(err) {
  if (err) {console.log("Greska")};
    console.log("Spojen na bazu");
    if(podaci.korisnik || podaci.admin){
      con.query("UPDATE korisnik SET slika = ? WHERE email = ?;",[req.file.filename, podaci.email], function (err, result, fields) {
        if(err) console.log(err);
        console.log("proslo");
        podaci.slika = req.file.filename;
          res.redirect('back');
      });
    }else if(podaci.tvrtka){
      con.query("UPDATE tvrtka SET slika = ? WHERE email = ?;",[req.file.filename, podaci.email], function (err, result, fields) {
        if(err) console.log(err);
        console.log("proslo");
        podaci.slika = req.file.filename;
        res.redirect('back');
      });
    }
});
};
