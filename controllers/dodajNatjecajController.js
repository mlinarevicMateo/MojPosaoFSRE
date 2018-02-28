var mysql = require('mysql');
var config = require('../configDB');
var moment = require('moment');
moment.locale('hr');
var con = mysql.createConnection(config.database);

module.exports = function(req, res){
  if(req.session.podaci.tvrtka){
    con.connect(function(err) {
      if (err) {console.log("Greska")};
      console.log("Spojen na bazu");
      con.query("SELECT * FROM tvrtka WHERE email=?;",[req.session.podaci.email], function (err, result, fields) {
        console.log("Tvrtka " + result[0].naziv + " zeli unijeti novi natjecaj.");
        var naziv = result[0].naziv;
        var datum_vrijeme = moment().format("D.MMMYYYY, HH:mm:ss").toString();
        var insert  = {naslov: req.body.ImeNaslova, text_natjecaja: req.body.text_natjecaja, tvrtka_fk: result[0].id, datum_vrijeme: datum_vrijeme};
        con.query("INSERT INTO natjecaji SET ?", insert, function (err, result) {
          console.log("Tvrtka " + naziv + " je unijela natjecaj.");
            res.redirect('/natjecaji/1');
        });
      });
    });
  }
}
