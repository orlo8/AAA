
$(document).ready(function() {
	var tulemusedkandidaadid=$("#tulemusedkandidaadid");
	var tulemustetabel=$("#tulemustetabel");
	var tableOpts={		"bPaginate": false,		"bLengthChange": false,		"bFilter": false,
	"bInfo": false, 	"bAutoWidth": true };
	tulemusedkandidaadid.dataTable(tableOpts); 
    tulemustetabel.dataTable(tableOpts); 
	tulemusedkandidaadid.fnClearTable();
	tulemustetabel.fnClearTable();
	tulemusedpiirkonnas=$("#tulemusedpiirkonnas");
	tulemusedpiirkonnas.dataTable(tableOpts);
	piirkonnavalik=$("#piirkonnavalik");
	
	erakonnatulemused=$("#erakonnatulemused");
	erakonnatulemused.dataTable(tableOpts);
	erakonnavalik=$("#erakonnavalik");
	
	var cachedtulemused;
	if(haslocalstorage)	cachedtulemused = localStorage.getItem('tulemused');
	$.ajax({ url: 'tulemused',	cache: false,
		success: function(tulemus){
			if(haslocalstorage){localStorage.setItem('tulemused', JSON.stringify(tulemus));	}
			fillTableIsik(tulemustetabel,tulemus);
			fillTableRiik(tulemusedkandidaadid,tulemus);
			
			tulemusedpiirkonnas.fnClearTable();
			fillTablePiirkond(tulemusedpiirkonnas,tulemus,piirkonnavalik.val());
			
			erakonnatulemused.fnClearTable();
			fillTablePartei(erakonnatulemused,tulemus,erakonnavalik.val());
		},
		error: function(){
			if(cachedtulemused!==null){
				parsedtulemused=JSON.parse(cachedtulemused);
				
				fillTableIsik(tulemustetabel,parsedtulemused);
				fillTableRiik(tulemusedkandidaadid,parsedtulemused);
				
				tulemusedpiirkonnas.fnClearTable();
				fillTablePiirkond(tulemusedpiirkonnas,parsedtulemused,piirkonnavalik.val());
				
				erakonnatulemused.fnClearTable();
				fillTablePartei(erakonnatulemused,parsedtulemused,erakonnavalik.val());
			}
		}
	});
	
	piirkonnavalik.change(function(){
		if(cachedtulemused!==null){
			parsedtulemused=JSON.parse(cachedtulemused);
			tulemusedpiirkonnas.fnClearTable();
			fillTablePiirkond(tulemusedpiirkonnas,parsedtulemused,piirkonnavalik.val());
		}
		else{
			$.getJSON("tulemused", function(tulemus) {
				tulemusedpiirkonnas.fnClearTable();
				fillTablePartei(tulemusedpiirkonnas,tulemus,piirkonnavalik.val());
			});
		}
	});
	
	
	erakonnavalik.change(function(){
		if(cachedtulemused!==null){
			parsedtulemused=JSON.parse(cachedtulemused);
			erakonnatulemused.fnClearTable();
			fillTablePartei(erakonnatulemused,parsedtulemused,erakonnavalik.val());
		}
		else{
			$.getJSON("tulemused", function(tulemus) {
				erakonnatulemused.fnClearTable();
				fillTablePartei(erakonnatulemused,tulemus,erakonnavalik.val());
			});
		}
	});
	initializeGoogleMaps();
});
function fillTableIsik(table,tulemus){
	
	for (var i in tulemus){
		var nimi = tulemus[i].kandidaat.isik.nimi;
		var id = tulemus[i].kandidaat.id;
		var erakond = tulemus[i].kandidaat.partei.nimi;
		var ringkond = tulemus[i].kandidaat.piirkond.nimi;
		var haali = tulemus[i].haali;
		table.dataTable().fnAddData( [id,ringkond,erakond,nimi,haali]);
	}
}

function fillTablePartei(table,tulemus,valituderakond){
	
	for (var i in tulemus){
		var nimi = tulemus[i].kandidaat.isik.nimi;
		var id = tulemus[i].kandidaat.id;
		var erakond = tulemus[i].kandidaat.partei.nimi;
		var ringkond = tulemus[i].kandidaat.piirkond.nimi;
		var haali = tulemus[i].haali;
		if(erakond===valituderakond)table.dataTable().fnAddData( [id,ringkond,erakond,nimi,haali]);
	}
}
function erakonnadPiirkonnaj2rgi(tulemus,piirkond){
	erakond=[];	
	for (var i in tulemus){
		var tmperakond=new Object();
		if(tulemus[i].kandidaat.piirkond.nimi!==piirkond){
			continue;
		}
		tmperakond.haali=tulemus[i].haali;
		tmperakond.nimi=tulemus[i].kandidaat.partei.nimi;
		esinesIndex=-1;
		for(var j=0;j<erakond.length;j++){
			if(erakond[j].nimi === tmperakond.nimi){
				esinesIndex=j;
				break;
			}
		}
		if(esinesIndex === -1){
			erakond.push(tmperakond);
		}
		else{	erakond[esinesIndex].haali+=tmperakond.haali;}
	}
	return erakond;
}
function fillTablePiirkond(table,tulemus,piirkond){
	erakond=erakonnadPiirkonnaj2rgi(tulemus,piirkond);
	for(var i in erakond){
		table.dataTable().fnAddData( [erakond[i].nimi,erakond[i].haali]);
	}
} 

function fillTableRiik(table,tulemus){
	
	erakond=[];	
	for (var i in tulemus){
		var tmperakond=new Object();
		tmperakond.haali=tulemus[i].haali;
		tmperakond.nimi=tulemus[i].kandidaat.partei.nimi;
		esinesIndex=-1;
		for(var j=0;j<erakond.length;j++){
			if(erakond[j].nimi === tmperakond.nimi){
				esinesIndex=j;
				break;
			}
		}
		if(esinesIndex === -1){
			erakond.push(tmperakond);
		}
		else{	erakond[esinesIndex].haali+=tmperakond.haali; }
	}
	for(var i in erakond){
		table.dataTable().fnAddData( [erakond[i].nimi,erakond[i].haali]);
	}
} 
function haslocalstorage(){
	try {
		return 'localStorage' in window && window['localStorage'] == null;
		} catch (e) {
		return false;
	}
}
function initializeGoogleMaps(){
	
	var eesti=new google.maps.LatLng(58.493694,25.358281);//Eesti keskpunkt
	
	var tartu=new google.maps.LatLng(58.3812,26.7435);
	var tallinn=new google.maps.LatLng(59.436961,24.753575);
	var k2rdla=new google.maps.LatLng(58.998204,22.746809);
	var kuressaare=new google.maps.LatLng(58.252923,22.485041);
	var haapsalu=new google.maps.LatLng(58.948249,23.537053);
	var p2rnu=new google.maps.LatLng(58.385808,24.496577);
	var rapla=new google.maps.LatLng(59.005735,24.794242);
	var paide=new google.maps.LatLng(58.88711,25.569944);
	var viljandi=new google.maps.LatLng(58.368091,25.597836);
	var valga=new google.maps.LatLng(57.777082,26.031522);
	var p6lva=new google.maps.LatLng(58.053746,27.054866);
	var v6ru=new google.maps.LatLng(57.846072,26.998698);
	var j6hvi=new google.maps.LatLng(59.3537,27.395);
	var j6geva=new google.maps.LatLng(58.746292,26.397212);
	var rakvere=new google.maps.LatLng(59.34796,26.36253);
	
	var asukohad=[tartu,tallinn,k2rdla,kuressaare,haapsalu,p2rnu,rapla,
	paide,	viljandi,valga,p6lva,v6ru,j6hvi,j6geva,rakvere];
	piirkonnad=["Tartumaa", "Harjumaa", "Hiiumaa", "Saaremaa", "Läänemaa", "Pärnumaa", "Raplamaa",
	"Järvamaa",	"Viljandimaa", "Valgamaa", "Põlvamaa", "Võrumaa", "Ida-Virumaa","Jõgevamaa","Lääne-Virumaa"];
	erakonnav2rvid={}
	erakonnav2rvid["Hääli pole"]='red';
	erakonnav2rvid["Erakond1"]='orange';
	erakonnav2rvid["Erakond2"]='blue';
	erakonnav2rvid["Erakond3"]='green';
	erakonnav2rvid["Erakond4"]='yellow';
	erakonnav2rvid["Erakond5"]='purple';
	erakonnav2rvid["Erakond6"]='pink';
	
	
	
	
	var mapProp = {	center:eesti, zoom:7,	draggable: false, scrollwheel: false,
		streetViewControl: false, mapTypeControl: false, mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	map=new google.maps.Map(document.getElementById("tulemusedkaardil"),mapProp);
	
	//workaround katkisele navigeerimisele
	google.maps.event.addListener(map, "idle", function(){
		map.setCenter(eesti);
		google.maps.event.trigger(map, 'resize'); 
	});	
	
	
	
	
	
	var boxText = document.createElement("div");
	boxText.style.cssText = "border: 1px solid black; margin-top: 8px; background: lightblue; padding: 5px;";
	boxText.innerHTML = "Viga, kontrolli võrguühendust";
	var myOptions = { content: boxText, pixelOffset: new google.maps.Size(-50, 0)
		,zesinesIndex: null, boxStyle: { opacity: 0.85,width: "100px"}
		,closeBoxMargin: "10px 2px 2px 2px"
		,infoBoxClearance: new google.maps.Size(1, 1)
		,isHidden: false
		,pane: "floatPane"
		,enableEventPropagation: false
	};
	
	infobox = new InfoBox(myOptions);
	addMarkers(asukohad);
	
	function addMarkers(asukohad){
		$.getJSON("tulemused", function(tulemus) {
			for(var i=0;i<asukohad.length;i++){
				var marker=new google.maps.Marker({position:asukohad[i]});
				
				erakonnad=[];	
				
				erakonnad=erakonnadPiirkonnaj2rgi(tulemus,piirkonnad[i]);
				var suurimindeks=-1;
				var rohkeimhaali=0;
				for(e in erakonnad){
					if(erakonnad[e].haali>rohkeimhaali){
						suurimindeks=e;
						rohkeimhaali=erakonnad[e].haali;
					}
				}
				if(suurimindeks!==-1){
					v2rv=erakonnav2rvid[erakonnad[suurimindeks].nimi];
					marker.setIcon('http://maps.google.com/mapfiles/ms/icons/'+v2rv+'-dot.png');
				}
				
				
				
				marker.setMap(map);
				google.maps.event.addListener(marker, 'click', function() {
					updateMarker(asukohad,this.getPosition());
					infobox.open(map,this);
				});
			}
		}); 
	}
	
	
	
	function updateMarker(asukohad,asukoht){
		
		$.getJSON("tulemused", function(tulemus) {
			erakonnad=[];	
			piirkonnaindeks=-1;
			for (var i in asukohad){
				if(asukohad[i].equals(asukoht)){
					piirkonnaindeks=i;
				}
			}
			
			piirkond=piirkonnad[piirkonnaindeks];
			erakonnad=erakonnadPiirkonnaj2rgi(tulemus,piirkond);
			var suurimindeks=-1;
			var haalikokku=0;
			var rohkeimhaali=0;
			for(e in erakonnad){
				haalikokku+=erakonnad[e].haali;
				if(erakonnad[e].haali>rohkeimhaali){
					suurimindeks=e;
					rohkeimhaali=erakonnad[e].haali;
				}
				
			}
			var boxText = document.createElement("div");
			boxText.style.cssText = "border: 1px solid black; margin-top: 4px; background: lightblue; padding: 2px; word-wrap: break-word;";
			
			if(erakonnad[suurimindeks]){
				boxText.innerHTML = piirkond+"<br/>1."+erakonnad[suurimindeks].nimi+"<br/>hääli: "+
				erakonnad[suurimindeks].haali+" - "+Math.round((erakonnad[suurimindeks].haali/haalikokku)*100)+"%";
			}
			else{
				boxText.innerHTML = "piirkonnas "+piirkond+" hääli ei leitud!";
			}
			infobox.setContent(boxText);
		});
		
	}
	
	
	legend=document.createElement("div");
	legend.style.cssText="width: 110px; border: 1px solid black; background: white; padding: 2px;"
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
	  legend); 
	for (var erakond in erakonnav2rvid) {
	  var div = document.createElement('div');
	  v2rv=erakonnav2rvid[erakond];
	  icon='http://maps.google.com/mapfiles/ms/icons/'+v2rv+'-dot.png';
	  div.innerHTML = '<img src="' + icon + '"> ' + erakond;
	  legend.appendChild(div);
	}
}
