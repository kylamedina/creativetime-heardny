jQuery(document).ready(function(){

	var parsePoints = function(datas){

		var point = new Array();
		var points = new Array();

		point = datas.split(" ");

		for (i in point) {

			point[i] && points.push(point[i].split(","));
		}
		return points;
	}

	jQuery('body svg').find('polygon[fill*="url"], rect[fill*="url"], path[fill*="url"], .hover').each(function(){


		jQuery(this).hover(

		function(){
			var id = jQuery(this).parent('svg').parent('span').attr('id').toUpperCase();
			var svgClone = jQuery('#' + id + ' svg').clone();
			var offset = jQuery(this).offset();

			//var points = parsePoints(jQuery(this).attr('points'));

			//var distX = (parseFloat(points[0][0]) + parseFloat(points[1][0]) + parseFloat(points[2][0]) + parseFloat(points[3][0])) / points.length;
			//var distY = (parseFloat(points[0][1]) + parseFloat(points[1][1]) + parseFloat(points[2][1]) + parseFloat(points[3][1])) / points.length;

			//var distX = (((this.getBoundingClientRect().width*1.2)/2)*-1);
			//var distY = (((this.getBoundingClientRect().height*1.2)/2)*-1);

			var distX = (this.getBoundingClientRect().width) - (this.getBoundingClientRect().width*1.2);
			var distY = (this.getBoundingClientRect().height) - (this.getBoundingClientRect().height*1.2);

			//var distX = (offset.left) - (offset.left*1.2);
			//var distY = (offset.top) - (offset.top*1.2);

			//console.log(/*distX + " : " + distY + " : " +*/);

			jQuery(this).parent('svg').append( jQuery(this).delay(10).transition({ scale: [1.2], duration: 10, x: distX, y: distY }) );

		},
		function(){
			var id = jQuery(this).parent('svg').parent('span').attr('id').toUpperCase();
			
			jQuery(this).transition({ scale: [1], duration: 10, x: 0, y: 0 }).dequeue();
			jQuery('#' + id).replaceWith(svgClone);
			//var id = jQuery(this).parent('svg').parent('span').attr('id').toLowerCase();

			//
			//jQuery(this).parent('svg').insertBefore(g#id).delay(10).transition({ scale: [1], duration: 10, x: distX, y: distY });
			//jQuery(this).parent('svg').prepend();

			console.log(id)//.insertBefore(g#id);

		});

	});

	jQuery('.wrapper div').click(function() {

		if(jQuery(this).hasClass('left'))
			jQuery(this).parent('div').find('li.active').prev().addClass('active').click().siblings().removeClass('active').dequeue();

		if(jQuery(this).hasClass('right'))
			jQuery(this).parent('div').find('li.active').next().addClass('active').click().siblings().removeClass('active').dequeue();

	});

	jQuery('.wrapper nav ul li').click(function() {

		var letter = (jQuery(this).html().toUpperCase() != '#') ? jQuery(this).html().toUpperCase() : 'hash';
      	var target = jQuery("#"+letter);
      
      	if (target) {
          	jQuery('html,body').animate({ scrollLeft: target.offset().left }, 500);
          	jQuery(this).addClass('active').siblings().removeClass('active');
          	return false;
      	}
	    
	});

});