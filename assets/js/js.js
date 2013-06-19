jQuery(document).ready(function(){

	jQuery('#tweets').find('div').each(function(){
		jQuery(this).children().contents().find('body div.media a img').css('width','auto').css('height','200px');
		jQuery(this).children().contents().find('body div.media iframe').css('width','auto').css('height','200px');
	});

	jQuery("#close").click(function () { 

		jQuery(this).parent('#overlay').data('current','').addClass('overlay').fadeOut('fast').children('span').empty().dequeue();
		jQuery('#tweets').css({ opacity: 0 }).find('div').each(function(){jQuery(this).css('display', 'none');});

	});

	jQuery('body').find('object').each(function(){

			jQuery(this.getSVGDocument().documentElement).children('g').children('g').each(function(){

			jQuery(this).click(function(e){

				var x = e.pageX + jQuery('#'+this.parentNode.getAttribute('id')).offset().left;
				var y = e.pageY + jQuery('#'+this.parentNode.getAttribute('id')).offset().top;

				var img = '';
				var id = this.getAttribute('id');

				jQuery('.meter').fadeIn('fast');

				if(jQuery(this).attr('class') == 'twitter') var tweet = true;
					
				if (jQuery(this).attr('class') == 'vine')
					var img = '<iframe class="vine-embed" src="'+jQuery(this).attr('data-video')+'/embed/simple" width="400" height="400" frameborder="0"></iframe>';
				else
					var img = '<img class="scaled-img" src="assets/img/'+this.parentNode.getAttribute('id')+'/big/'+id+'.jpg">';
			
				if(jQuery('#overlay').data('current') != id && jQuery('#overlay').data('current')) {

					jQuery('#tweets').css({ opacity: 0 }).find('div').each(function(){jQuery(this).css('display', 'none');})

					jQuery('#overlay')
							     .data('current',id)
								 .stop()
								 .removeClass('overlay')
								 .children('span')
								 .empty()
								 .parent('div')
								 .fadeIn('fast')
								 .children('span')
								 .append(img)
								 .css({ opacity: 0 })
								 .children().load(function(){

								 	jQuery('.meter').css('display', 'none');

								 	if(tweet) {
										var w = 229;
										var h = (jQuery('#overlay').height()/2) - (jQuery('#tweets').children('#'+id).height()/2);
										jQuery('#tweets').css({ opacity: 1, translate: [w,h] }).children('#'+id).fadeIn('fast').siblings().css('display', 'none');
								 	} else {
								 		var w = (jQuery('#overlay').width()/2) - (jQuery('#popup').outerWidth()/2);
										var h = (jQuery('#overlay').height()/2) - (jQuery('#popup').outerHeight()/2);
								 		jQuery(this).parent('span').fadeIn('fast').css({ opacity: 1, translate: [w,h] });
								 	}
								 })
								 .dequeue();

				} else 
					if(jQuery('#overlay').hasClass('overlay')) 
						jQuery('#overlay')
										 .data('current', id)
										 .stop()
										 .removeClass('overlay')
										 .fadeIn('fast')
										 .children('span')
										 .append(img)
										 .css({ opacity: 0 })
										 .children().load(function(){

										 	jQuery('.meter').css('display', 'none');

											if(tweet) {
												var w = 229;
												var h = (jQuery('#overlay').height()/2) - (jQuery('#tweets').children('#'+id).height()/2);
												jQuery('#tweets').css({ opacity: 1, translate: [w,h] }).children('#'+id).fadeIn('fast').siblings().css('display', 'none');
										 	} else {
										 		var w = (jQuery('#overlay').width()/2) - (jQuery('#popup').outerWidth()/2);
												var h = (jQuery('#overlay').height()/2) - (jQuery('#popup').outerHeight()/2);
										 		jQuery(this).parent('span').fadeIn('fast').css({ opacity: 1, translate: [w,h] });
										 	}
										 })
										 .dequeue();

					else jQuery('#overlay')
										 .data('current','')
										 .stop()
										 .addClass('overlay')
										 .fadeOut('fast')
										 .children('span')
										 .transition({ translate: [x,y] }, 500)
										 .empty()
										 .parent('div')
										 .children('div.meter').css('display', 'none')
										 .parent('div')
										 .parent('body')
										 .children('#tweets')
										 .css({ opacity: 0 })
										 .find('div')
										 .each(function(){jQuery(this).css('display', 'none');})
										 .dequeue();

				
			});
		
			jQuery(this).hover(
			function(){
				jQuery(this).transition({ opacity: 0.5 }, 50).dequeue();
			},
			function(){
				jQuery(this).transition({ opacity: 1 }, 50).dequeue();
			});
		});

	});

	jQuery('.wrapper div').click(function() {

		if(jQuery(this).hasClass('left'))
			jQuery(this).parent('div').find('li.active').prev().addClass('active').click().siblings().removeClass('active').dequeue();

		if(jQuery(this).hasClass('right'))
			jQuery(this).parent('div').find('li.active').next().addClass('active').click().siblings().removeClass('active').dequeue();

	});

	jQuery('nav ul li').click(function() {

		var letter = (jQuery(this).html().toUpperCase() != '#') ? jQuery(this).html().toUpperCase() : 'hash';
				var target = jQuery("#"+letter);
			
				if (target) {
					jQuery(this).addClass('active').siblings().removeClass('active');
						jQuery('.frame').animate({ scrollLeft: (target.position().left + (target.width()/2) - (jQuery('.frame').width()/2)) }, 500).dequeue();
				}
			
	});

});