var mysql = require('mysql');
var config = require('../configDB');
var con = mysql.createConnection(config.database);

module.exports = function(req,res){
  con.connect(function(err) {
  if (err) {console.log("Greska")};
  console.log("Spojen na bazu");
  con.query("DELETE FROM natjecaji WHERE id = ?", parseInt(req.params.id), function(err, result){
    if(err) console.log(err);
    res.redirect('back');
  });
  });
};
