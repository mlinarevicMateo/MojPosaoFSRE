$(document).ready(function(){
  // $("#buttonRegistracija").click(function(){
  // window.location.href = "registracija";
  // });
  // $("#buttonLogin").click(function(){
  // window.location.href = "login";
  // });
  $("#odjava").click(function(){
    window.location.href = "/logout";
  });
  $('a[href="/#O-nama"]').click(function() {
    $('html, body').animate({
        scrollTop: $("#O-nama").offset().top
    }, 750);
});
  $("#adminPanel").click(function(){
    window.location.href = "/adminPanel";
  });
  $("#mojProfilKorisnik").click(function(){
    window.location.href = "/mojProfilKorisnik";
  });
  $("#mojePrijave").click(function(){
    window.location.href = "/mojePrijave";
  });
  $("#mojiNatjecaji").click(function(){
    window.location.href = "/mojiNatjecaji";
  });
  $("#mojProfilTvrtka").click(function(){
    window.location.href = "/mojProfilTvrtka";
  });
  $("#natjecaji").click(function(){
    window.location.href="natjecaji";
  });
  $("#NoviNatjecajbutton").click(function(){
    $("#NoviNatjecaj").show('slow');
  });
  $("#OdustaniNoviNatjecaj").click(function(){
    $("#NoviNatjecaj").hide('slow');
  });

    $("#prikaziKorisnike").hide();
    $("#prikaziKorisnikeButton").click(function(){
      $("#korisnici").hide();
      $("#prikaziKorisnike").show();
    });
    $("#sakrijKorisnikeButton").click(function(){
      $("#korisnici").show();
      $("#prikaziKorisnike").hide();
    });

    $("#prikaziTvrtke").hide();
    $("#prikaziTvrtkeButton").click(function(){
      $("#tvrtke").hide();
      $("#prikaziTvrtke").show();
    });
    $("#sakrijTvrtkeButton").click(function(){
      $("#tvrtke").show();
      $("#prikaziTvrtke").hide();
    });

    $("#prikaziNatjecaje").hide();
    $("#prikaziNatjecajeButton").click(function(){
      $("#natjecaj").hide();
      $("#prikaziNatjecaje").show();
    });
    $("#sakrijNatjecajeButton").click(function(){
      $("#natjecaj").show();
      $("#prikaziNatjecaje").hide();
    });

    $("#prikaziPrijave").hide();
    $("#prikaziPrijaveButton").click(function(){
      $("#prijave").hide();
      $("#prikaziPrijave").show();
    });
    $("#sakrijPrijaveButton").click(function(){
      $("#prijave").show();
      $("#prikaziPrijave").hide();
    });

    $("#form2").hide();
  $(".buttonRegKor").click(function(){
    $('.buttonRegKor').addClass('active');
    $('.buttonRegTvr').removeClass('active');
    $("#form1").show();
    $("#form2").hide();
    $("form#form2 :input").each(function(){
      var input = $(this);
      this.value="";
    });

  });
  //Za lozinku kod Logina
$("#LozinkaLogin").click(function(){
  $("#LozinkaLogin").css("box-shadow", "none");
});

$("#forma-Login").submit(function(event){
  var lozinka=$("#LozinkaLogin").val();
  console.log(lozinka);
  if(lozinka.length < 5 ){
    $("#spanLoginlozinka").text( "Lozinka ima manje od 5 znakova" ).show().fadeOut( 3000 );
    $("#LozinkaLogin").css("box-shadow", "5px 5px 80px red");
    event.preventDefault();
  }
});
//Provjera za registraciju korisnik
$("#LozinkaKorisnikRegistracija").click(function(){
  $("#LozinkaKorisnikRegistracija").css("box-shadow", "none");
  $("#PonovljenaLozinkaRegistracijaK").css("box-shadow", "none");
});

$( "#form1" ).submit(function( event ) {
  var lozinka=$('#LozinkaKorisnikRegistracija').val();
  var ponovljenaLozinka=$('#PonovljenaLozinkaRegistracijaK').val();
  console.log(lozinka,ponovljenaLozinka);

  if(lozinka.length < 5 ){
    $( "#spanRegistracijalozinka" ).text( "Lozinka ima manje od 5 znakova" ).show().fadeOut( 3000 );
    $("#LozinkaKorisnikRegistracija").css("box-shadow", "5px 5px 80px red");
    $("#PonovljenaLozinkaRegistracijaK").css("box-shadow", "5px 5px 80px red");
    event.preventDefault();
  }
  else if ( lozinka === ponovljenaLozinka ) {
    $( "#spanRegistracijalozinka" ).text().show();
  }
  else{
    $( "#spanRegistracijalozinka" ).text( "Nova lozinka se ne podudara" ).show().fadeOut( 3000 );
    $("#LozinkaKorisnikRegistracija").css("box-shadow", "5px 5px 80px red");
    $("#PonovljenaLozinkaRegistracijaK").css("box-shadow", "5px 5px 80px red");
    event.preventDefault();
  }
});
//Provjera za registraciju tvrtka
$("#LozinkaKorisnikRegistracija").click(function(){
  $("#LozinkaKorisnikRegistracija").css("box-shadow", "none");
  $("#PonovljenaLozinkaRegistracijaK").css("box-shadow", "none");
});

$( "#form2" ).submit(function( event ) {
  var lozinka=$('#LozinkaTvrtkaRegistracija').val();
  var ponovljenaLozinka=$('#PonovljenaLozinkaRegistracijaT').val();
  console.log(lozinka,ponovljenaLozinka);

  if(lozinka.length < 5 ){
    $( "#spanRegistracijalozinkaT" ).text( "Lozinka ima manje od 5 znakova" ).show().fadeOut( 3000 );
    $("#LozinkaTvrtkaRegistracija").css("box-shadow", "5px 5px 80px red");
    $("#PonovljenaLozinkaRegistracijaT").css("box-shadow", "5px 5px 80px red");
    event.preventDefault();
  }
  else if ( lozinka === ponovljenaLozinka ) {
    $( "#spanRegistracijalozinkaT" ).text().show();
  }
  else{
    $( "#spanRegistracijalozinkaT" ).text( "Nova lozinka se ne podudara" ).show().fadeOut( 3000 );
    $("#LozinkaTvrtkaRegistracija").css("box-shadow", "5px 5px 80px red");
    $("#PonovljenaLozinkaRegistracijaT").css("box-shadow", "5px 5px 80px red");
    event.preventDefault();
  }
});
  $(".buttonRegTvr").click(function(){
    $('.buttonRegKor').removeClass('active');
    $('.buttonRegTvr').addClass('active');
    $("#form1").hide();
    $("#form2").show();
    $("form#form1 :input").each(function(){
      var input = $(this);
      this.value="";
    });
  });
  $("#dropdown").on("click", function(e){
    e.preventDefault();

    if($(this).hasClass("open")) {
      $(this).removeClass("open");
      $(this).children("ul").slideUp("fast");
    } else {
      $(this).addClass("open");
      $(this).children("ul").slideDown("fast");
    }
  });
});
$("#Uredi").click(function(){
    $("#UrediProfil").show('slow');
    $("#UrediLozinku").hide();
  });

  $("#PromijenuLozinku").click(function(){
    $("#UrediLozinku").show('slow');
    $("#UrediProfil").hide();

  });
  $(".stisni").click(function(){
   $("#myPopup").show('slow');
 });
 $("#NEbutton").click(function(){
   $("#myPopup").hide('slow');
 });
 $("#DAbutton").click(function() {
   var txt1 = '<div class="UspijesnaPrijava"><h6>Uspijeno ste prijavili natjèaj elimo vam svu srecu</h6></div>';
   console.log("usao");
   $("#myElement").append(txt1);
   $("#myPopup").hide('slow');
   $("#stisni").slideUp();
 });

 $("#UspjenoDodanNatjecaj").click(function(){
   var txt1 = '<div class="UspijesnaPrijava"><h6>Uspijeno ste prijavili natjèaj elimo vam svu srecu</h6></div>';
   console.log("usao");
   $("#NoviNatjecajbutton").append(txt1);
 });



 $("#NovaLozinkaKorisnik").click(function(){
   $("#NovaLozinkaKorisnik").css("box-shadow", "none");
   $("#PonoviNovaLozinkaKorisnik").css("box-shadow", "none");
 });
 $("#NovaLozinkaTvrtka").click(function(){
   $("#NovaLozinkaTvrtka").css("box-shadow", "none");
   $("#PonoviNovaLozinkaTvrtka").css("box-shadow", "none");
 });
 /*Provjeravanje promjene lozinke za Tvrtku*/

 $( "#forma-tvrtka-promjenaLozinke" ).submit(function( event ) {
   var lozinka=$('#NovaLozinkaTvrtka').val();
   var ponovljenaLozinka=$('#PonoviNovaLozinkaTvrtka').val();
   console.log(lozinka,ponovljenaLozinka);

   if(lozinka.length < 5 || ponovljenaLozinka.length <5){
     $( "#spanLozinkeTvrtka" ).text( "Nova lozinka nesmije biti manja od 5 znakova" ).show().fadeOut( 3000 );
     $("#NovaLozinkaTvrtka").css("box-shadow", "5px 5px 80px red");
     $("#PonoviNovaLozinkaTvrtka").css("box-shadow", "5px 5px 80px red");
     event.preventDefault();
   }
   else if ( lozinka === ponovljenaLozinka ) {
     $( "#spanLozinkeTvrtka" ).text( "Sve je oke..." ).show();
   }
   else{
     $( "#spanLozinkeTvrtka" ).text( "Nova lozinka se ne podudara" ).show().fadeOut( 3000 );
     $("#NovaLozinkaTvrtka").css("box-shadow", "5px 5px 80px red");
     $("#PonoviNovaLozinkaTvrtka").css("box-shadow", "5px 5px 80px red");
     event.preventDefault();
   }
 });
 /*Provjeravanje promjene lozinke za Korisnika*/

 $( "#forma-korisnik-promjenaLozinke" ).submit(function( event ) {
   var lozinka=$('#NovaLozinkaKorisnik').val();
   var ponovljenaLozinka=$('#PonoviNovaLozinkaKorisnik').val();
   console.log(lozinka,ponovljenaLozinka);

   if(lozinka.length < 5 || ponovljenaLozinka.length <5){
     $( "#spanLozinkeKorisnik" ).text( "Nova lozinka nesmije biti manja od 5 znakova" ).show().fadeOut( 3000 );
     $("#NovaLozinkaKorisnik").css("box-shadow", "5px 5px 80px red");
     $("#PonoviNovaLozinkaKorisnik").css("box-shadow", "5px 5px 80px red");
     event.preventDefault();
   }
   else if ( lozinka === ponovljenaLozinka ) {
     $( "#spanLozinkeKorisnik" ).text( "Sve je oke..." ).show();
   }
   else{
     $( "#spanLozinkeKorisnik" ).text( "Nova lozinka se ne podudara" ).show().fadeOut( 3000 );
     $("#NovaLozinkaKorisnik").css("box-shadow", "5px 5px 80px red");
     $("#PonoviNovaLozinkaKorisnik").css("box-shadow", "5px 5px 80px red");
     event.preventDefault();
   }
 });
