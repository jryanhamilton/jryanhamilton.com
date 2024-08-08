$(document).ready(function(){
	// load home page when the page loads
    $(".sub_content").load("webdesign.html");
    
    $(".sub_link_web a").addClass("sub_link_active");
    
    $(".sub_link_web").click(function(){
	// load about page on click
		$(".sub_content").load("webdesign.html");
		
		$(".sub_link_active").removeClass("sub_link_active");
		$(".sub_link_web a").addClass("sub_link_active");
	});
	$(".sub_link_interaction").click(function(){
	// load contact form onclick
		$(".sub_content").load("interactiondesign.html");
		
		$(".sub_link_active").removeClass("sub_link_active");
		$(".sub_link_interaction a").addClass("sub_link_active");
	});
});