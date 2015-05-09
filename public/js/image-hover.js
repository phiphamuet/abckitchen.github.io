jQuery(document).ready(function(){					
 
	 jQuery('.images').hover(function() {
			 jQuery(this).find('.icons').stop().animate({
    "opacity": "1"
  }, 200 );
			 }, function() {
			jQuery(this).find('.icons').stop().animate({
    "opacity": "0"
  }, 200 );
			 
	   });
	 
	 
});