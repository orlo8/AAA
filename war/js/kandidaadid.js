console.log("kandidaadid.js");
$(document).ajaxComplete(function (){
	var erakonnad = ["Eestimaa rohelised", "Keskerakond", "Sotsiaaldemokraadid"];
	erakonnaotsing=$( "#erakonnaotsing" );
	erakonnaotsing.autocomplete({
	  source: erakonnad
	});
	var ringkonnad=["Harjumaa", "Tartumaa", "Eestimaa"];
	ringkonnaotsing=$( "#ringkonnaotsing" );
	ringkonnaotsing.autocomplete({
	  source: ringkonnad
	});
		
	$("table tr").on("click",function(){
	   var row = $(this);
	});
	$("#otsikandidaati").on("click",function(event){
		event.preventDefault();
		if(ringkonnaotsing.val()!=="" && erakonnaotsing.val()!==""){				
			var nimekiri=$("#nimekiri");
			nimekiri.find("tr:gt(0)").remove();
			$.getJSON("data/findCandidatesByPartyAndRegion.json", function(result) {
				for (var i in result.candidates){
					var nimi =result.candidates[i].person.name;
					var id =result.candidates[i].id;
					filltable(nimekiri,id,ringkonnaotsing.val(),erakonnaotsing.val(),nimi);
				}
			});
		}
		else if(ringkonnaotsing.val()!==""){
			$.getJSON("data/findCandidatesByRegion.json", function(result) {			
				var nimekiri=$("#nimekiri");
				nimekiri.find("tr:gt(0)").remove();
				for (var i in result.candidates){
					var nimi =result.candidates[i].person.name;
					var id =result.candidates[i].id;
					var erakond=result.candidates[i].party.name;
					filltable(nimekiri,id,ringkonnaotsing.val(),erakond,nimi);
				}
			});
		}
		else if(erakonnaotsing.val()!==""){
			$.getJSON("data/findCandidatesByParty.json", function(result) {								
				var nimekiri=$("#nimekiri");
				nimekiri.find("tr:gt(0)").remove();
				for (var i in result.candidates){
					var nimi =result.candidates[i].person.name;
					var id =result.candidates[i].id;
					var ringkond=result.candidates[i].region.name;
					filltable(nimekiri,id,ringkond,erakonnaotsing.val(),nimi);
				}
			});
		}
	});
});
function filltable(table,id,ringkond,erakond,nimi){
	adder="";
	adder+='<tr>';
	adder+='<td>'+id+'</td>';
	adder+='<td>'+ringkond+'</td>';
	adder+='<td>'+erakond+'</td>';
	adder+='<td>'+nimi+'</td>';
	adder+='</tr>';
	table.append(adder);
}