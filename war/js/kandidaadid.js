console.log("kandidaadid.js");
$(document).ready(function (){
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
	var prmarr = prmstr.split ("&");
	var params = {};
	for ( var i = 0; i < prmarr.length; i++) {
		var tmparr = prmarr[i].split("=");
		params[tmparr[0]] = tmparr[1];
	}
	
	
	
	$.getJSON("kandidaadid", function(result) {
		var erakonnad = geterakonnad(result);
		erakonnaotsing=$( "#erakonnaotsing" );
		erakonnaotsing.autocomplete({
			lookup: erakonnad
		});
		
		var ringkonnad= getpiirkonnad(result);
		ringkonnaotsing=$( "#ringkonnaotsing" );
		ringkonnaotsing.autocomplete({
			lookup: ringkonnad
		}); 
		
		var nimed=getnimed(result);
		nimeotsing=$( "#nimeotsing" );
		nimeotsing.autocomplete({
			serviceUrl: "kandidaadid",
			paramName:"term",
			minChars: 2,
			onSelect: function () {
				erakonnaotsing.val("");
				ringkonnaotsing.val("");
				if(cachedkandidaadid!==null){
					parsedkandidaadid=JSON.parse(cachedkandidaadid);
					var regex = new RegExp("^"+nimeotsing.val(),"gi");
					autocompleteresult=filterByNimi(parsedkandidaadid,regex);
					nimekiri.find("tr:gt(0)").remove();
					filltable(nimekiri,autocompleteresult);
					
					console.log("select from cache");
				}
				else{
					$.getJSON("kandidaadid?nimi="+nimeotsing.val(), function(result) {			
						nimekiri.find("tr:gt(0)").remove();
						filltable(nimekiri,result);
					});
				}
			}
		});
		nimeotsing.on("input",function(){
			if(nimeotsing.val().length > 1){
				erakonnaotsing.val("");
				ringkonnaotsing.val("");
				if(cachedkandidaadid!==null){
					parsedkandidaadid=JSON.parse(cachedkandidaadid);
					var regex = new RegExp("^"+nimeotsing.val(),"gi");
					autocompleteresult=filterByNimi(parsedkandidaadid,regex);
					nimekiri.find("tr:gt(0)").remove();
					filltable(nimekiri,autocompleteresult);
					console.log("input from cache");
				}
				else{
					$.getJSON("kandidaadid?nimi="+nimeotsing.val(), function(result) {			
						nimekiri.find("tr:gt(0)").remove();
						filltable(nimekiri,result);
					});
				}
			}
		});
		localStorage.setItem('kandidaadid', JSON.stringify(result));
		nimekiri.find("tr:gt(0)").remove();
		result=filterByPiirkond(result,params.piirkond);
		result=filterByErakond(result,params.erakond);
		filltable(nimekiri,result);
	});
	var cachedkandidaadid = localStorage.getItem('kandidaadid');
	if(cachedkandidaadid!==null){
		filltable(nimekiri,JSON.parse(cachedkandidaadid));
	}
	
	
		
	$("#otsikandidaati").on("click",function(event){	
		event.preventDefault();
		if(cachedkandidaadid!==null){
			var parsedkandidaadid=JSON.parse(cachedkandidaadid);
			result=filterByPiirkond(parsedkandidaadid,ringkonnaotsing.val());
			result=filterByErakond(result,erakonnaotsing.val());
			href=history.state.leht+"&piirkond="+ringkonnaotsing.val()+"&erakond="+erakonnaotsing.val();
			history.pushState({leht: history.state.leht}, "", "?leht="+href);
			nimekiri.find("tr:gt(0)").remove();
			filltable(nimekiri,result);
			return;	
		}
		else{
			$.getJSON("kandidaadid", function(result) {
				localStorage.setItem('kandidaadid', JSON.stringify(result));
				nimekiri.find("tr:gt(0)").remove();
				filltable(nimekiri,result);
			});
		}
		
	});
});

function haslocalstorage(){
	try {
	return 'localStorage' in window && window['localStorage'] == null;
  } catch (e) {
	return false;
  }
}

function filltable(table,result){
	if(result==''){
		adder='<tr>';
		adder+='<td>ei leidnud</td>';
		adder+='<td>ei leidnud</td>';
		adder+='<td>ei leidnud</td>';
		adder+='<td>ei leidnud</td>';
		adder+='</tr>';
		table.append(adder);
		return;
	}
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

function filterByPiirkond(result,piirkond){
	if(result===null || piirkond===""){
		return result;
	}
	out=[];
	for (var i in result){
		if(result[i].piirkond.nimi.match(piirkond) !==null){
			out.push(result[i]);
		}
	}
	return out;
}
function filterByErakond(result,erakond){
	if(result===null || erakond===""){
		return result;
	}
	out=[];
	for (var i in result){
		if(result[i].partei.nimi.match(erakond)!== null){
			out.push(result[i]);
		}
	}
	return out;
}
function filterByNimi(result,nimi){
	if(result===null || nimi===""){
		return result;
	}
	out=[];
	for (var i in result){
		if(result[i].isik.nimi.match(nimi)!== null){
			out.push(result[i]);
		}
	}
	return out;
}


function geterakonnad(result){
	erakonnad=[];
	for (var i in result){
		if(erakonnad.indexOf(result[i].partei.nimi)=== -1){
			erakonnad.push(result[i].partei.nimi);
		}
	}
	return erakonnad;
}
function getnimed(result){
	nimed=[];
	for (var i in result){
		if(nimed.indexOf(result[i].isik.nimi)=== -1){
			nimed.push(result[i].isik.nimi);
		}
	}
	return nimed;
}
function getpiirkonnad(result){
	piirkonnad=[];
	for (var i in result){
		if(piirkonnad.indexOf(result[i].piirkond.nimi)=== -1){
			piirkonnad.push(result[i].piirkond.nimi);
		}
	}
	return piirkonnad;
}
