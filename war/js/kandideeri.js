console.log("kandideeri.js");
$(document).ready(function (){
	ringkond=$("#ringkond");
	erakond=$("#erakond");
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
	
	//erakond.autocomplete( "destroy" );
	
	erakond.autocomplete({
	  source: erakonnad
	});
	
	var ringkonnad=["Harjumaa", "Tartumaa", "Eestimaa"];
	
	//ringkond.autocomplete( "destroy" );
	ringkond.autocomplete({
	  source: ringkonnad
	});

});
