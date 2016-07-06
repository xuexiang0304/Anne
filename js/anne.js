jQuery(document).ready(function(){ 
	"use strict"; // Start of use strict	

    $('a.page-scroll').click(function(event) {
        var $anchor = $(this);
        $('html, body').animate({scrollTop:($($anchor.attr('href')).offset().top - 50)}, 600, function() {
        });
        event.preventDefault();
    });

    if(screen.width> 768){
	    $(window.document).scroll(function(){
	    	if ($(document).scrollTop() > 50){
	    		$('#header').addClass('header_highlight');
	    		$('#nav ul li a').addClass('nav_highlight');
	    	}else{
	    		$('#header').removeClass('header_highlight');
	    		$('#nav ul li a').removeClass('nav_highlight');
	    	}
	    });
	}

	var list = $(".slide").children();
	initial_slide(list);

	var current_index= 0;
	$(".pre-next>button").click(function(){
		if ($(this).is(".next")|| $(this).parent().is(".next")){
			if (current_index == list.length-1){
				$.each(list,function(index, value){
					$(value).animate({"left": "+="+screen.width*current_index+"px"}, 800);
				});
				current_index = 0;
			}else{
				$.each(list,function(index, value){
					$(value).animate({"left": "-="+screen.width+"px"}, 800);
				});
				current_index++;
			}
		}else{
			if (current_index == 0){
				$.each(list,function(index, value){
					$(value).animate({"left": "-="+screen.width*(list.length-1)+"px"}, 800);
				});
				current_index = list.length-1;
			}else{
				$.each(list,function(index, value){
					$(value).animate({"left": "+="+screen.width+"px"}, 800);
				});
				current_index--;
			}
		}
		$(".donts li").find(".active").removeClass("active");
		$(".donts li").eq(current_index).find("button").addClass("active");
	});

	$(".donts").click(function(){
		var ele = $(event.target).parent();
		var target_index = Number(ele.attr("index"));
		$.each(list,function(index, value){
			$(value).animate({"left": screen.width*(index-target_index)+"px"}, 800);
		});
		$(this).find(".active").removeClass("active");
		$(event.target).addClass("active");
	});
	var interval = setInterval(function(){
		$(".pre-next button.next>span").click();
	}, 10000)

	$(".nav-icon").click(function(){
    	$(this).parent().find("ul").toggleClass("hidden");
  	});
});

function initial_slide(list){
	for (var i=0; i< list.length;i++){
		list[i].style.left = screen.width*list[i].getAttribute("index") + 'px';
	}
}