jQuery(document).ready(function(){

	var x,y,s;

	jQuery('#tweets').find('div').each(function(){
		jQuery(this).children().contents().find('body div.media a img').css('width','auto').css('height','200px');
		jQuery(this).children().contents().find('body div.media iframe').css('width','auto').css('height','200px');
	});

	jQuery("#overlay").click(function () { 

		jQuery(this).children('#close').trigger('click');

	});

	jQuery("#close").click(function () {

		var current = jQuery(this).parent('#overlay').data('current');

		jQuery('body').find('object').each(function(){

			jQuery(this.getSVGDocument().documentElement).children('g').children('g#'+current).trigger('click');

		});

	});

	jQuery('body').find('object').each(function(){

			jQuery(this.getSVGDocument().documentElement).children('g').children('g').each(function(){

			jQuery(this).click(function(e){

				jQuery('.meter').fadeIn('fast');

				var i = this.getAttribute('id');
				var c = this.getAttribute('class');

				if(!e.isTrigger)
					x = e.pageX + jQuery('#'+this.parentNode.getAttribute('id')).offset().left, y = e.pageY + jQuery('#'+this.parentNode.getAttribute('id')).offset().top;

				if(c == 'vine')
					var img = '<iframe class="vine-embed" src="'+jQuery(this).attr('data-video')+'/embed/simple" width="400" height="400" frameborder="0"></iframe>';
				
				else
					var img = '<img class="scaled-img" src="assets/img/'+this.parentNode.getAttribute('id')+'/big/'+i+'.jpg">';

				if(jQuery('#overlay').hasClass('overlay')) 
					jQuery('#overlay')
									 .data('current', i)
									 .stop()
									 .removeClass('overlay')
									 .fadeIn('fast')
									 .children('span')
									 .append(img)
									 .css({ opacity: 0 })
									 .children().load(function(){

									 	jQuery('div.meter').css('display', 'none');

										if(c == 'twitter') {
											var w = 229;
											var h = (jQuery('#overlay').height()/2) - (jQuery('#tweets').children('#'+i).outerHeight()/2);
											jQuery('#tweets').addClass('importantRule').css({ opacity: 1, translate: [w,h] }).children('#'+i).fadeIn('fast').siblings().css('display', 'none');
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
									 .children('div.meter')
									 .css('display', 'none')
									 .parent('div')
									 .children('span')
									 .transition({ translate: [x,y] }, 500)
									 .empty()
									 .parent('div')
									 .parent('body')
									 .children('#tweets')
									 .removeClass('importantRule')
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

	jQuery('.wrapper div').mousedown(function() {

		var myself = jQuery(this);

		s = setInterval(function(){

			if(myself.hasClass('left')) {
				var left = jQuery('.frame').scrollLeft()>0 ? jQuery('.frame').scrollLeft()-50 : jQuery('.frame').scrollLeft();
				jQuery('.frame').scrollLeft(left);
			}

			if(myself.hasClass('right')) {
				var right = jQuery('.frame').scrollLeft()<2797 ? jQuery('.frame').scrollLeft()+50 : jQuery('.frame').scrollLeft();
				jQuery('.frame').scrollLeft(right);
			}

		},1000/25);

	}).mouseup(function(event) {

		clearInterval(s); jQuery('.frame').dequeue();

		jQuery(this).parent('div').find('li').each(function(){

			var letter = (jQuery(this).html().toUpperCase() != '#') ? jQuery(this).html().toUpperCase() : 'hash';
			var target = jQuery("#"+letter);

			if(target.offset().left > (jQuery('.frame').width()/100*35) && target.offset().left < (jQuery('.frame').width()/100*65))
				jQuery(this).addClass('active').siblings().removeClass('active').dequeue();

		});

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