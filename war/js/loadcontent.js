$(document).ready(function(){
	$('#peamenyy').on("click","a",function(){
		var href = $(this).attr('href');
		$('#peamenyy a').removeClass("aktiivne");
		$(this).addClass("aktiivne");
		if(href=="index.html"){
			$('#sisu').load(href+" #sisu");
			return false;
		}
		$('#sisu').load(href);
		return false;
	});
});
