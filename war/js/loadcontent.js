$(document).ready(function(){
	
	var prmstr = window.location.search.substr(1);
	var prmarr = prmstr.split ("&");
	var params = {};

	for ( var i = 0; i < prmarr.length; i++) {
		var tmparr = prmarr[i].split("=");
		params[tmparr[0]] = tmparr[1];
	}
	if(params.leht!==null && params.leht!=="index.html"){
		$('#sisu').load(params.leht);
		$('#peamenyy a').removeClass("aktiivne");
		$('a[href*="'+params.leht+'"]').addClass("aktiivne");
	}
	else if(params.leht=="index.html"){
		$('#sisu').load("index.html #sisu");	
		
		$('#peamenyy a').removeClass("aktiivne");
			$('a[href*="'+"index.html"+'"]').addClass("aktiivne");
	}
	
	window.onpopstate = function(event) {
		if(event.state===null){
			leht="index.html #sisu";
				
			$('#sisu').load(leht);
			$('#peamenyy a').removeClass("aktiivne");
			$('a[href*="'+"index.html"+'"]').addClass("aktiivne");
			return;
		}
		
		var leht=event.state.leht;
		$('#sisu').load(leht);
		$('#peamenyy a').removeClass("aktiivne");
		$('a[href*="'+leht+'"]').addClass("aktiivne");
	  };
	
	$('#peamenyy').on("click","a",function(){
		
		var href = $(this).attr('href');
		$('#peamenyy a').removeClass("aktiivne");
		$(this).addClass("aktiivne");
		history.pushState({leht: href}, "", "?leht="+href);
		//if(href != "index.html"){window.location = "#"+href};
		if(href=="index.html"){
			window.location="";
			$('#sisu').load(href+" #sisu");
			return false;
		}
		$('#sisu').empty().html('<img id="ajaxLoader" src="img/ajax-loader.gif" />');		
		$('#sisu').hide().load(href,function(){
			$('#sisu').fadeIn( 500 );
			});
		
		return false;
	});
});
