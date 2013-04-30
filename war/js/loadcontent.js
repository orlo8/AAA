$(document).ready(function(){
	
	
	
	var prmstr = window.location.search.substr(1);
	var prmarr = prmstr.split ("&");
	var params = {};
	for ( var i = 0; i < prmarr.length; i++) {
		var tmparr = prmarr[i].split("=");
		params[tmparr[0]] = tmparr[1];
	}
	if(params.leht!==null){
		$('#sisu').load(params.leht);				
		$('#peamenyy a').removeClass("aktiivne");
		$('a[href*="'+params.leht+'"]').addClass("aktiivne");
	}
	else{
		leht="index.html";
		$('#sisu').load("index.html #sisu");
		$('#peamenyy a').removeClass("aktiivne");
		$('a[href*="'+"index.html"+'"]').addClass("aktiivne");
	}
	window.onpopstate = function(event) {
			if(params.leht!==null){
				$('#sisu').load(params.leht);				
				$('#peamenyy a').removeClass("aktiivne");
				$('a[href*="'+params.leht+'"]').addClass("aktiivne");
			}
			else{
				leht="index.html";
				$('#sisu').load("index.html #sisu");
				$('#peamenyy a').removeClass("aktiivne");
				$('a[href*="'+"index.html"+'"]').addClass("aktiivne");
			}
			return;
	  };
	
	$('#peamenyy').on("click","a",function(){
		
		var href = $(this).attr('href');
		$('#peamenyy a').removeClass("aktiivne");
		$(this).addClass("aktiivne");
		if(href!=="index.html"){
		history.pushState({leht: href}, "", "?leht="+href);
		}
		//if(href != "index.html"){window.location = "#"+href};
		if(href=="index.html"){
			window.location="/";
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
function haslocalstorage(){
	try {
	return 'localStorage' in window && window['localStorage'] == null;
  } catch (e) {
	return false;
  }
}