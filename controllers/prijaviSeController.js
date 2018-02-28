var mysql = require('mysql');
var config = require('../configDB');
var con = mysql.createConnection(config.database);

module.exports = function(req,res){
  con.connect(function(err) {
  var insert = {korisnik_id: req.session.podaci.kid, natjecaj_id: parseInt(req.params.id)};
  con.query("INSERT INTO prijave SET ?", insert, function(err, result){
    if(err) console.log(err);
    res.redirect('back');
  });
  });
};
