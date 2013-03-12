$(document).ready(function(){
	$('#peamenyy').on("click","a",function(){
		var href = $(this).attr('href');
		$('#peamenyy a').removeClass("aktiivne");
		$(this).addClass("aktiivne");
		$('#sisu').css('display','block').animate({height:'200px'},function(){
			//$('#ajax').html('<img class="loader" src="http://example.com/slide-fade-content/loader.gif" alt="">');
			$('#sisu').load(href, function(){
				ajaxfinished();
			});
		});
		return false;
	});
});
