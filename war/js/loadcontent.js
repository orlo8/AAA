$(document).ready(function(){
	$(window).on("hashchange", function(){
		if(window.location.hash){
		var hash=window.location.hash.substring(1);
		$('#sisu').load(hash);
		$('#peamenyy a').removeClass("aktiivne");
		$('a[href*="'+hash+'"]').addClass("aktiivne");
		}
	});
	if(window.location.hash){
		var hash=window.location.hash.substring(1);
		$('#sisu').load(hash);
		$('#peamenyy a').removeClass("aktiivne");
		$('a[href*="'+hash+'"]').addClass("aktiivne");
	}
		
	$('#peamenyy').on("click","a",function(){
		var href = $(this).attr('href');
		$('#peamenyy a').removeClass("aktiivne");
		$(this).addClass("aktiivne");
		if(href != "index.html"){window.location = "#"+href};
		if(href=="index.html"){
			window.location="";
			$('#sisu').load(href+" #sisu");
			return false;
		}
		else if (href == "tulemused.html"){
			$('#sisu').empty().html('<img id="ajaxLoader" src="img/ajax-loader.gif" />');
			setTimeout(function(){
				$('#sisu').load(href);
			},1000);
			return false;
		}
		$('#sisu').load(href);
		return false;
	});
});
