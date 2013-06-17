jQuery(document).ready(function(){

	jQuery("#close").click(function () { 

		jQuery(this).parent('#overlay').data('current','').addClass('overlay').fadeOut('fast').children('span').empty().dequeue();

	});

	jQuery('body').find('object').each(function(){

			jQuery(this.getSVGDocument().documentElement).children('g').children('g').each(function(){

			jQuery(this).click(function(e){

				var x = e.pageX + jQuery('#'+this.parentNode.getAttribute('id')).offset().left;
				var y = e.pageY + jQuery('#'+this.parentNode.getAttribute('id')).offset().top;

				var id = this.getAttribute('id');
				var img = '<img class="scaled-img" src="assets/img/'+this.parentNode.getAttribute('id')+'/big/'+id+'.jpg">';
			
				if(jQuery('#overlay').data('current') != id && jQuery('#overlay').data('current'))
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
								 .children('img').load(function(){
								 	var w = (jQuery('#overlay').width()/2) - (jQuery('#popup').outerWidth()/2);
									var h = (jQuery('#overlay').height()/2) - (jQuery('#popup').outerHeight()/2);
								 	jQuery(this).parent('span').transition({ translate: [w,h] });
								 })
								 .dequeue();		 

				else 
					if(jQuery('#overlay').hasClass('overlay')) 
						jQuery('#overlay')
										 .data('current', id)
										 .stop()
										 .removeClass('overlay')
										 .fadeIn('fast')
										 .children('span')
										 .append(img)
										 .children('img').load(function(){
										 	var w = (jQuery('#overlay').width()/2) - (jQuery('#popup').outerWidth()/2);
											var h = (jQuery('#overlay').height()/2) - (jQuery('#popup').outerHeight()/2);
										 	jQuery(this).parent('span').css({ translate: [w,h] });
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