$(document).ready(function() {
	if (hasBorderRadius()) {
		$("img.roundCorners").each(function() {
		    $(this).wrap('<div class="roundCorners" />');
	
	    	var imgSrc = $(this).attr("src"); // 4
	    	var imgHeight = $(this).height(); // 4
		    var imgWidth = $(this).width(); // 4
	
		    $(this).parent()
	
	    		.css("background-image", "url(" + imgSrc + ")")
				.css("background-repeat","no-repeat")
				.css("height", imgHeight + "px")
				.css("width", imgWidth + "px");
			$(this).remove();
		});
	}
});