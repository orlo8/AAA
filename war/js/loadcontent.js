$(document).ready(function(){
	$('#peamenyy').on("click","a",function(){
		var href = $(this).attr('href');
		$('#peamenyy a').removeClass("aktiivne");
		$(this).addClass("aktiivne");
		if(href=="index.html"){
			$('#sisu').load(href+" #sisu");
			return false;
		}
		else if (href == "tulemused.html"){
			$('#sisu').empty().html('<img id="ajaxLoader" src="img/ajax-loader.gif" />')
			setTimeout(function(){
				$('#sisu').load(href+" #sisu");
			},1000);
			return false;
		}
		$('#sisu').load(href);
		return false;
	});
});
