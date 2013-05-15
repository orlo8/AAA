console.log("kandideeri.js");
$(document).ready(function () {
    'use strict';
    var ringkond = $("#ringkond"), erakond = $("#erakond"), erakonnad = ["Eestimaa rohelised", "Keskerakond", "Sotsiaaldemokraadid"];
    $("#kandideeriform").submit(function() {
        var viga = false;
        //algseisu v‰‰rtuste taastamine
        $(".vead").remove();
        ringkond.removeClass("vigane");
        erakond.removeClass("vigane");
        if (ringkond.val() === "") {
            ringkond.after('<p class="vead">Palun vali ringkond</p>');
            viga = true;
            ringkond.addClass("vigane");
        }
        if (erakond.val() === "") {
            erakond.after('<p class="vead">Palun vali erakond</p>');
            viga = true;
            erakond.addClass("vigane");
        }
        if (viga) return false;
    });
    erakond.autocomplete({
      lookup: erakonnad
    });
    var ringkonnad = ["Harjumaa", "Tartumaa", "Eestimaa"];
    //ringkond.autocomplete( "destroy" );
    ringkond.autocomplete({
      lookup: ringkonnad
    });
});