var mysql = require('mysql');
var config = require('../configDB');
var con = mysql.createConnection(config.database);

module.exports = function(req, res){
  con.connect(function(err) {
    con.query("UPDATE korisnik SET admin = ? WHERE id = ?;", [0, req.params.id], function(err, result){
        res.redirect('back');
    });
  });
}
