console.log("kandidaadid.js");
$(document).ready(function (){
	 var erakonnad = ["Erakond1", "Erakond2", "Erakond3"];
	erakonnaotsing=$( "#erakonnaotsing" );
	//erakonnaotsing.autocomplete( "destroy" );
	erakonnaotsing.autocomplete({
		lookup: erakonnad
	});
	var ringkonnad=["Valgamaa", "Tartumaa", "Harjumaa"];
	ringkonnaotsing=$( "#ringkonnaotsing" );
	
	//ringkonnaotsing.autocomplete( "destroy" );
	ringkonnaotsing.autocomplete({
		lookup: ringkonnad
	}); 
	nimeotsing=$( "#nimeotsing" );
	
	
	var nimekiri=$("#nimekiri");
	
	$("#nimekiri tbody").delegate("tr", "click", function() {
		var fourthCellText = $("td:eq(3)", this).text();
		var row = $(this);
			$.post('haaleta', { kashaaletatud: 1, isik: 15 }, function(data) {
			if(data[0]==="haaletatud"){
				if (confirm('Oled juba hääletanud, soovid hääle tühistada?')) {
					$.post('haaleta', { tyhista: 1, isik: 15 }, function(data) {
					
					});
				}
			}
			else if (confirm('Kindel et tahad kandidaadi "'+fourthCellText+'" poolt hääletada?')) {
				
				$.post('haaleta', { kandidaat: $("td:eq(0)", row).text(), isik: 15 }, function(data) {
					
				});
			}
				});	  
	});
	
	
	var prmstr = window.location.search;
	
	
	$.getJSON("kandidaadid"+prmstr, function(result) {
		nimekiri.find("tr:gt(0)").remove();
		filltable(nimekiri,result);
	});
	nimeotsing.autocomplete({
		serviceUrl:"kandidaadid",
		paramName:"term",
		minChars: 2,
		onSelect: function (suggestion) {
			$.getJSON("kandidaadid?nimi="+nimeotsing.val(), function(result) {			
				nimekiri.find("tr:gt(0)").remove();
				filltable(nimekiri,result);
			});
		}
	  });
	nimeotsing.on("input",function(){
		if(nimeotsing.val().length > 1){
			$.getJSON("kandidaadid?nimi="+nimeotsing.val(), function(result) {			
				nimekiri.find("tr:gt(0)").remove();
				filltable(nimekiri,result);
			});
		}
	});
	$("#otsikandidaati").on("click",function(event){
		event.preventDefault();
		if(ringkonnaotsing.val()!=="" && erakonnaotsing.val()!==""){
			href=history.state.leht+"&piirkond="+ringkonnaotsing.val()+"&partei="+erakonnaotsing.val();
			history.pushState({leht: history.state.leht}, "", "?leht="+href);
			nimekiri.find("tr:gt(0)").remove();
			$.getJSON("kandidaadid?piirkond="+ringkonnaotsing.val()+"&partei="+erakonnaotsing.val(), function(result) {
				nimekiri.find("tr:gt(0)").remove();
				filltable(nimekiri,result);
			});
		}
		else if(ringkonnaotsing.val()!==""){
			
			href=history.state.leht+"&piirkond="+ringkonnaotsing.val();
			history.pushState({leht: history.state.leht}, "", "?leht="+href);
			$.getJSON("kandidaadid?piirkond="+ringkonnaotsing.val(), function(result) {
				nimekiri.find("tr:gt(0)").remove();
				filltable(nimekiri,result);
			});
		}
		else if(erakonnaotsing.val()!==""){
			
			href=history.state.leht+"&partei="+erakonnaotsing.val();
			history.pushState({leht: history.state.leht}, "", "?leht="+href);
			$.getJSON("kandidaadid?partei="+erakonnaotsing.val(), function(result) {		
				nimekiri.find("tr:gt(0)").remove();
				filltable(nimekiri,result);
			});
		}
		else{
			$.getJSON("kandidaadid", function(result) {	
				nimekiri.find("tr:gt(0)").remove();
				filltable(nimekiri,result);
			});
		}
	});
});
function filltable(table,result){
	for (var i in result){
		var nimi =result[i].isik.nimi;
		var id =result[i].id;
		var erakond=result[i].partei.nimi;
		var ringkond=result[i].piirkond.nimi;
		
		adder='<tr>';
		adder+='<td>'+id+'</td>';
		adder+='<td>'+ringkond+'</td>';
		adder+='<td>'+erakond+'</td>';
		adder+='<td>'+nimi+'</td>';
		adder+='</tr>';
		table.append(adder);
	}
}	