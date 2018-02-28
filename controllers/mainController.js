var bodyParser = require('body-parser');
var fs = require('fs');
var regKorisnikController = require('./regKorisnikController');
var regTvrtkaController = require('./regTvrtkaController');
var loginController = require('./loginController');
var natjecajiController = require('./natjecajiController');
var dodajNatjecajController = require('./dodajNatjecajController');
var urediProfilKorisnik = require('./urediProfilKorisnik');
var urediProfilTvrtka = require('./urediProfilTvrtka');
var obrisiNatjecajController = require('./obrisiNatjecajController');
var pogledajPrijaveController = require('./pogledajPrijaveController');
var obrisiTvrtkuController = require('./obrisiTvrtkuController');
var obrisiKorisnikaController = require('./obrisiKorisnikaController');
var prijaviSeController = require('./prijaviSeController');
var odjaviSeController = require('./odjaviSeController');
var adminPanelController = require('./adminPanelController');
var mojePrijaveController = require('./mojePrijaveController');
var mojiNatjecajiController = require('./mojiNatjecajiController');
var dodajAdminaController = require('./dodajAdminaController');
var obrisiAdminaController = require('./obrisiAdminaController');
var promijeniLozinkuKorisnik = require('./promijeniLozinkuKorisnik');
var promijeniLozinkuTvrtka = require('./promijeniLozinkuTvrtka');
const multer = require('multer');
const path = require('path');
var updateImageController = require('./updateImageController');
module.exports = function(app){
  app.get('/', function(req, res){
    if(!req.session.podaci){
      return res.render('index');
    }
    else{
      return res.render('index', {
        layout:false,
        session: req.session.podaci
      });
    }
  });
  app.get('/natjecaji/:page', function(req,res){
    natjecajiController(req,res);
  });
  app.get('/mojePrijave', function(req,res){
    if(typeof req.session.podaci != 'undefined' && req.session.podaci.korisnik){
      mojePrijaveController(req,res);
    }else{
      var img = fs.readFileSync('assets/img/404.png');
      res.writeHead(404, {'Content-Type': 'image/png' });
      res.end(img, 'binary');
    }
  });
  app.get('/mojiNatjecaji', function(req,res){
    if(typeof req.session.podaci != 'undefined' && req.session.podaci.tvrtka){
      mojiNatjecajiController(req,res);
    }else{
      var img = fs.readFileSync('assets/img/404.png');
      res.writeHead(404, {'Content-Type': 'image/png' });
      res.end(img, 'binary');
    }
  });
  app.get('/obrisiNatjecaj/:id', function(req,res){
    if(typeof req.session.podaci != 'undefined' && (req.session.podaci.tvrtka || req.session.podaci.admin)){
      obrisiNatjecajController(req,res);
    }else{
      var img = fs.readFileSync('assets/img/404.png');
      res.writeHead(404, {'Content-Type': 'image/png' });
      res.end(img, 'binary');
    }
  });
  app.get('/pogledajPrijave/:id', function(req,res){
    if(typeof req.session.podaci != 'undefined' && req.session.podaci.tvrtka){
      pogledajPrijaveController(req,res);
    }else{
      var img = fs.readFileSync('assets/img/404.png');
      res.writeHead(404, {'Content-Type': 'image/png' });
      res.end(img, 'binary');
    }
  });
  app.get('/obrisiTvrtku/:id', function(req,res){
    if(typeof req.session.podaci != 'undefined' && req.session.podaci.admin){
      obrisiTvrtkuController(req,res);
    }else{
      var img = fs.readFileSync('assets/img/404.png');
      res.writeHead(404, {'Content-Type': 'image/png' });
      res.end(img, 'binary');
    }
  });
  app.get('/obrisiKorisnika/:id', function(req,res){
    if(typeof req.session.podaci != 'undefined' && req.session.podaci.admin){
      obrisiKorisnikaController(req,res);
    }else{
      var img = fs.readFileSync('assets/img/404.png');
      res.writeHead(404, {'Content-Type': 'image/png' });
      res.end(img, 'binary');
    }
  });
  app.get('/dodajAdmina/:id', function(req,res){
    if(typeof req.session.podaci != 'undefined' && req.session.podaci.admin){
      dodajAdminaController(req,res);
    }else{
      var img = fs.readFileSync('assets/img/404.png');
      res.writeHead(404, {'Content-Type': 'image/png' });
      res.end(img, 'binary');
    }
  });
  app.get('/obrisiAdmina/:id', function(req,res){
    if(typeof req.session.podaci != 'undefined' && req.session.podaci.admin){
      obrisiAdminaController(req,res);
    }else{
      var img = fs.readFileSync('assets/img/404.png');
      res.writeHead(404, {'Content-Type': 'image/png' });
      res.end(img, 'binary');
    }
  });
  app.get('/prijaviSe/:id', function(req,res){
    if(typeof req.session.podaci != 'undefined' && req.session.podaci.korisnik){
      prijaviSeController(req,res);
    }else{
      var img = fs.readFileSync('assets/img/404.png');
      res.writeHead(404, {'Content-Type': 'image/png' });
      res.end(img, 'binary');
    }
  });
  app.get('/odjaviSe/:id', function(req,res){
    if(typeof req.session.podaci != 'undefined' && req.session.podaci.korisnik){
      odjaviSeController(req,res);
    }else{
      var img = fs.readFileSync('assets/img/404.png');
      res.writeHead(404, {'Content-Type': 'image/png' });
      res.end(img, 'binary');
    }
  });
  app.get('/adminPanel', function(req, res){
    if(!req.session.podaci.admin){
      var img = fs.readFileSync('assets/img/404.png');
      res.writeHead(404, {'Content-Type': 'image/png' });
      res.end(img, 'binary');
    }
    else{
      adminPanelController(req,res);
    }
  });
  app.get('/login', function(req, res){
    res.render('login');
  });
  app.get('/logout', function(req,res){
    req.session.destroy();
    res.redirect('/');
  });
  app.get('/mojProfilKorisnik', function(req,res){
    if(typeof req.session.podaci != 'undefined' && (req.session.podaci.admin || req.session.podaci.korisnik)){
      res.render('mojProfilKorisnik', {
      layout:false,
      session: req.session.podaci
      });
    }else{
      var img = fs.readFileSync('assets/img/404.png');
      res.writeHead(404, {'Content-Type': 'image/png' });
      res.end(img, 'binary');
    }
  });
  app.get('/mojProfilTvrtka', function(req,res){
    if(typeof req.session.podaci != 'undefined' && req.session.podaci.tvrtka){
      res.render('mojProfilTvrtka', {
      layout:false,
      session: req.session.podaci
      });
    }else{
      var img = fs.readFileSync('assets/img/404.png');
      res.writeHead(404, {'Content-Type': 'image/png' });
      res.end(img, 'binary');
    }
  });

  app.get('/registracija', function(req, res){
    res.render('registracija');
  });

  var urlencodedParser = bodyParser.urlencoded({ extended: false });
  app.post('/registerKorisnik', urlencodedParser, function(req, res){
    if (!req.body){
      return res.sendStatus(400);
    }else{
      regKorisnikController(req, res);
    }
  });
  app.post('/registerTvrtka', urlencodedParser, function(req, res){
    if (!req.body){
      return res.sendStatus(400);
    }else{
      regTvrtkaController(req, res);
    }
  });

  app.post('/logIn', urlencodedParser, function (req, res) {
    if (!req.body){
      return res.sendStatus(400);
    }else{
      loginController(req, res);
    }
  });

  app.post('/dodajNatjecaj', urlencodedParser, function(req, res){
    if (!req.body){
      return res.sendStatus(400);
    }else{
      if(typeof req.session.podaci != 'undefined' && req.session.podaci.tvrtka){
        dodajNatjecajController(req, res);
      }else{
        var img = fs.readFileSync('assets/img/404.png');
        res.writeHead(404, {'Content-Type': 'image/png' });
        res.end(img, 'binary');
      }
    }
  });

  app.post('/urediProfilKorisnik', urlencodedParser, function(req, res){
    if (!req.body){
      return res.sendStatus(400);
    }else{
      if(typeof req.session.podaci != 'undefined' && (req.session.podaci.admin || req.session.podaci.korisnik)){
        urediProfilKorisnik(req, res);
      }else{
        var img = fs.readFileSync('assets/img/404.png');
        res.writeHead(404, {'Content-Type': 'image/png' });
        res.end(img, 'binary');
      }
    }
  });
  app.post('/promijeniLozinkuKorisnik', urlencodedParser, function(req, res){
    if (!req.body){
     res.sendStatus(400);
    }else{
      if(typeof req.session.podaci != 'undefined' && (req.session.podaci.admin || req.session.podaci.korisnik)){
        promijeniLozinkuKorisnik(req,res);
      }
      else{
        var img = fs.readFileSync('assets/img/404.png');
        res.writeHead(404, {'Content-Type': 'image/png' });
        res.end(img, 'binary');
      }
    }
  });
  app.post('/promijeniLozinkuTvrtka', urlencodedParser, function(req, res){
    if (!req.body){
     res.sendStatus(400);
    }else{
      if(typeof req.session.podaci != 'undefined' && req.session.podaci.tvrtka){
        promijeniLozinkuTvrtka(req,res);
      }
      else{
        var img = fs.readFileSync('assets/img/404.png');
        res.writeHead(404, {'Content-Type': 'image/png' });
        res.end(img, 'binary');
      }
    }
  });
  app.post('/urediProfilTvrtka', urlencodedParser, function(req, res){
    if (!req.body){
      return res.sendStatus(400);
    }else{
      if(typeof req.session.podaci != 'undefined' && req.session.podaci.tvrtka){
        urediProfilTvrtka(req, res);
      }else{
        var img = fs.readFileSync('assets/img/404.png');
        res.writeHead(404, {'Content-Type': 'image/png' });
        res.end(img, 'binary');
      }
    }
  });
// SLIKAA //

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: 'assets/img/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + req.session.podaci.email + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 10000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  },
  onFileComplete: function(file, req,res){
    return;
  }
}).single('profile_photo');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}


app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      console.log(err);
      res.render('mojProfilKorisnik');
    } else {
      if(req.file == undefined){
        console.log('Error: No File Selected!');
        res.render('mojProfilKorisnik');
      } else {
        console.log('File Uploaded!');
        updateImageController(req, req.session.podaci, res);
        setTimeout(()=>{
        res.render('mojProfilKorisnik', {
          file: `uploads/${req.file.filename}`,
          layout:false,
          session: req.session.podaci
        });
      },1000);
      }
    }
  });
});
};
