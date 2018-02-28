var mysql = require('mysql');
var config = require('../configDB');
var con = mysql.createConnection(config.database);

module.exports = function(req,res){
  con.connect(function(err) {
  con.query("DELETE FROM prijave WHERE natjecaj_id = ? AND korisnik_id = ?", [parseInt(req.params.id), req.session.podaci.kid], function(err, result){
    if(err) console.log(err);
    res.redirect('back');
  });
  });
};
