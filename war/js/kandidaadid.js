console.log("kandidaadid.js");
$(document).ready(function (){
	var erakonnad = ["Erakond1", "Erakond2", "Erakond3"];
	erakonnaotsing=$( "#erakonnaotsing" );
	//erakonnaotsing.autocomplete( "destroy" );
	erakonnaotsing.autocomplete({
	  source: erakonnad
	});
	var ringkonnad=["Valgamaa", "Tartumaa", "Harjumaa"];
	ringkonnaotsing=$( "#ringkonnaotsing" );
	
	//ringkonnaotsing.autocomplete( "destroy" );
	ringkonnaotsing.autocomplete({
	  source: ringkonnad
	});
	nimeotsing=$( "#nimeotsing" );
	
	$.getJSON("kandidaadid", function(result) {								
		var nimekiri=$("#nimekiri");
			nimekiri.find("tr:gt(0)").remove();
			for (var i in result){
				var nimi =result[i].isik.nimi;
				var id =result[i].id;
				var erakond=result[i].partei.nimi;
				var ringkond=result[i].piirkond.nimi;
				filltable(nimekiri,id,ringkond,erakond,nimi);
			}
		});
	
	$("table tr").on("click",function(){
	   var row = $(this);
	});
	nimeotsing.on("input",function(){
		if(nimeotsing.val().length > 1){
			$.getJSON("kandidaadid?nimi="+nimeotsing.val(), function(result) {			
				var nimekiri=$("#nimekiri");
				nimekiri.find("tr:gt(0)").remove();
				for (var i in result){
					var nimi =result[i].isik.nimi;
					var id =result[i].id;
					var erakond=result[i].partei.nimi;
					var ringkond=result[i].piirkond.nimi;
					filltable(nimekiri,id,ringkond,erakond,nimi);
				}
			});
			}
		});
	$("#otsikandidaati").on("click",function(event){
		event.preventDefault();
		if(ringkonnaotsing.val()!=="" && erakonnaotsing.val()!==""){
			if(window.location.hash){
			var hash=window.location.hash.substring(1);
			}
			window.location=hash+"?piirkond="+ringkonnaotsing.val()+"&partei="+erakonnaotsing.val();
			var nimekiri=$("#nimekiri");
			nimekiri.find("tr:gt(0)").remove();
			$.getJSON("kandidaadid?piirkond="+ringkonnaotsing.val()+"&partei="+erakonnaotsing.val(), function(result) {
				for (var i in result){
					var nimi =result[i].isik.nimi;
					var id =result[i].id;
					var erakond=result[i].partei.nimi;
					var ringkond=result[i].piirkond.nimi;
					filltable(nimekiri,id,ringkond,erakond,nimi);
				}
			});
		}
		else if(ringkonnaotsing.val()!==""){
			$.getJSON("kandidaadid?piirkond="+ringkonnaotsing.val(), function(result) {			
				var nimekiri=$("#nimekiri");
				nimekiri.find("tr:gt(0)").remove();
				for (var i in result){
					var nimi =result[i].isik.nimi;
					var id =result[i].id;
					var erakond=result[i].partei.nimi;
					var ringkond=result[i].piirkond.nimi;
					filltable(nimekiri,id,ringkond,erakond,nimi);
				}
			});
		}
		else if(erakonnaotsing.val()!==""){
			$.getJSON("kandidaadid?partei="+erakonnaotsing.val(), function(result) {								
				var nimekiri=$("#nimekiri");
				nimekiri.find("tr:gt(0)").remove();
				for (var i in result){
					var nimi =result[i].isik.nimi;
					var id =result[i].id;
					var erakond=result[i].partei.nimi;
					var ringkond=result[i].piirkond.nimi;
					filltable(nimekiri,id,ringkond,erakond,nimi);
				}
			});
		}
		else{
			$.getJSON("kandidaadid", function(result) {								
				var nimekiri=$("#nimekiri");
				nimekiri.find("tr:gt(0)").remove();
				for (var i in result){
					var nimi =result[i].isik.nimi;
					var id =result[i].id;
					var erakond=result[i].partei.nimi;
					var ringkond=result[i].piirkond.nimi;
					filltable(nimekiri,id,ringkond,erakond,nimi);
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