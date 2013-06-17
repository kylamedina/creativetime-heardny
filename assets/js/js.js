jQuery(document).ready(function(){

	jQuery("#close").click(function () { 

		jQuery(this).parent('#overlay').addClass('overlay').fadeOut('fast').children('span').empty().dequeue();

	});

	jQuery('body').find('object').each(function(){

			jQuery(this.getSVGDocument().documentElement).children('g').children('g').each(function(){

			jQuery(this).click(function(e){

				var x = e.pageX + jQuery('#'+this.parentNode.getAttribute('id')).offset().left;
				var y = e.pageY + jQuery('#'+this.parentNode.getAttribute('id')).offset().top;

				var id = this.getAttribute('id');
				var img = '<img class="scaled-image" src="assets/img/'+this.parentNode.getAttribute('id')+'/big/'+id+'.jpg">';
			
				if(jQuery('#overlay').data('current') != id && jQuery('#overlay').data('current'))
					jQuery('#overlay')
								 .stop()
								 .removeClass('overlay')
								 .children('span')
								 .empty()
								 .delay(500)
								 .parent('div')
								 .fadeIn('fast')
								 .children('span')
								 .append(img)
								 .transition({ translate: [(jQuery('.frame').width()/2) - (jQuery('#popup').width()/2),(jQuery('.frame').height()/2) - (jQuery('#popup').height()/2)] }, 500)
								 .dequeue();

				else 
					if(jQuery('#overlay').hasClass('overlay'))
						jQuery('#overlay')
										 .stop()
										 .removeClass('overlay')
										 .fadeIn('fast')
										 .children('span')
										 .append(img)
										 .css({ translate: [x,y] })
										 .transition({ translate: [(jQuery('.frame').width()/2) - (jQuery('#popup').width()/2),(jQuery('.frame').height()/2) - (jQuery('#popup').height()/2)] }, 500)
										 .dequeue();
						
					else jQuery('#overlay')
										 .stop()
										 .addClass('overlay')
										 .fadeOut('fast')
										 .children('span')
										 .transition({ translate: [x,y] }, 500)
										 .empty()
										 .dequeue();
				
				jQuery('#overlay').data('current',id);

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