
$(document).ready(function() {
	
	var tulemusedkandidaadid=$("#tulemusedkandidaadid");
	var tulemustetabel=$("#tulemustetabel");
	var tableOpts={
	"bPaginate": false,
	"bLengthChange": false,
	"bFilter": false,
	"bInfo": false,
	"bAutoWidth": true };
	tulemusedkandidaadid.dataTable(tableOpts); 
    tulemustetabel.dataTable(tableOpts); 
	tulemusedkandidaadid.fnClearTable();
	tulemustetabel.fnClearTable();
	tulemusedpiirkonnas=$("#tulemusedpiirkonnas");
	tulemusedpiirkonnas.dataTable(tableOpts);
	
	$.getJSON("tulemused", function(result) {
			fillTableIsik(tulemustetabel,result);
			fillTableRiik(tulemusedkandidaadid,result);
		});
	
	piirkonnavalik=$("#piirkonnavalik");
	$.getJSON("tulemused", function(result) {
			
			tulemusedpiirkonnas.fnClearTable();
			fillTablePiirkond(tulemusedpiirkonnas,result,piirkonnavalik.val());
		});
	piirkonnavalik.change(function(){
		$.getJSON("tulemused", function(result) {
			
			tulemusedpiirkonnas.fnClearTable();
			fillTablePiirkond(tulemusedpiirkonnas,result,piirkonnavalik.val());
		});
	});
	erakonnatulemused=$("#erakonnatulemused");
	erakonnatulemused.dataTable(tableOpts);
	erakonnavalik=$("#erakonnavalik");
	$.getJSON("tulemused", function(result) {
			erakonnatulemused.fnClearTable();
			fillTablePartei(erakonnatulemused,result,erakonnavalik.val());
		});
	erakonnavalik.change(function(){
		$.getJSON("tulemused", function(result) {
			erakonnatulemused.fnClearTable();
			fillTablePartei(erakonnatulemused,result,erakonnavalik.val());
		});
	});
	
});

function fillTableIsik(table,result){
	
	for (var i in result){
		var nimi = result[i].kandidaat.isik.nimi;
		var id = result[i].kandidaat.id;
		var erakond = result[i].kandidaat.partei.nimi;
		var ringkond = result[i].kandidaat.piirkond.nimi;
		var haali = result[i].haali;
		table.dataTable().fnAddData( [id,ringkond,erakond,nimi,haali]);
	}
}

function fillTablePartei(table,result,valituderakond){
	
	for (var i in result){
		var nimi = result[i].kandidaat.isik.nimi;
		var id = result[i].kandidaat.id;
		var erakond = result[i].kandidaat.partei.nimi;
		var ringkond = result[i].kandidaat.piirkond.nimi;
		var haali = result[i].haali;
		if(erakond===valituderakond)table.dataTable().fnAddData( [id,ringkond,erakond,nimi,haali]);
	}
}


//piirkonna järgi - üleval piirkond nt. Harjumaa, all erakond, häälte arv?
function fillTablePiirkond(table,result,piirkond){
	
	erakond=[];	
	for (var i in result){
		var tmperakond=new Object();
		if(result[i].kandidaat.piirkond.nimi!==piirkond){
			continue;
		}
		tmperakond.haali=result[i].haali;
		tmperakond.nimi=result[i].kandidaat.partei.nimi;
		index=-1;
		for(var j=0;j<erakond.length;j++){
			if(erakond[j].nimi === tmperakond.nimi){
				index=j;
				break;
			}
		}
		if(index === -1){
			erakond.push(tmperakond);
		}
		else{	erakond[index].haali+=tmperakond.haali;		}
		
			
	}
	for(var i in erakond){
		table.dataTable().fnAddData( [erakond[i].nimi,erakond[i].haali]);
	}
} 

function fillTableRiik(table,result){
	
	erakond=[];	
	for (var i in result){
		var tmperakond=new Object();
		tmperakond.haali=result[i].haali;
		tmperakond.nimi=result[i].kandidaat.partei.nimi;
		index=-1;
		for(var j=0;j<erakond.length;j++){
			if(erakond[j].nimi === tmperakond.nimi){
				index=j;
				break;
			}
		}
		if(index === -1){
			erakond.push(tmperakond);
		}
		else{	erakond[index].haali+=tmperakond.haali; }
	}
	for(var i in erakond){
		table.dataTable().fnAddData( [erakond[i].nimi,erakond[i].haali]);
	}
} 