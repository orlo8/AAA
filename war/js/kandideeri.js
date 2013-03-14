$(document).ajaxStop(function (){
	ringkond=$("#ringkonnasisestus");
	erakond=$("#erakonnasisestus");
	$("#kandideeriform").submit(function(){
		var viga=false;		
		//algseisu v‰‰rtuste taastamine
		$(".vead").remove();
		ringkond.removeClass("vigane");
		erakond.removeClass("vigane");
		if(ringkond.val()==""){
			ringkond.after('<p class="vead">Palun vali ringkond</p>');
			viga=true;		
			ringkond.addClass("vigane");
		}
		if(erakond.val()==""){
			erakond.after('<p class="vead">Palun vali erakond</p>');
			viga=true;			
			erakond.addClass("vigane");
		}
		if(viga) return false;
	});
	
	var erakonnad = ["Eestimaa rohelised", "Keskerakond", "Sotsiaaldemokraadid"];
	$( "#erakonnasisestus" ).autocomplete({
	  source: erakonnad
	});

	var ringkonnad=["Harjumaa", "Tartumaa", "Eestimaa"];
	$( "#ringkonnasisestus" ).autocomplete({
	  source: ringkonnad
	});

});
