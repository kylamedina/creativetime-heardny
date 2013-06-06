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

	jQuery('body svg').find('polygon[fill*="url"], rect[fill*="url"]').each(function(){


		jQuery(this).hover(

		function(){

			//var points = parsePoints(jQuery(this).attr('points'));

			//var distX = (parseFloat(points[0][0]) + parseFloat(points[1][0]) + parseFloat(points[2][0]) + parseFloat(points[3][0])) / points.length;
			//var distY = (parseFloat(points[0][1]) + parseFloat(points[1][1]) + parseFloat(points[2][1]) + parseFloat(points[3][1])) / points.length;

			//var distX = (((this.getBoundingClientRect().width*1.2)/2)*-1);
			//var distY = (((this.getBoundingClientRect().height*1.2)/2)*-1);

			var distX = (this.getBoundingClientRect().width) - (this.getBoundingClientRect().width*1.2);
			var distY = (this.getBoundingClientRect().height) - (this.getBoundingClientRect().height*1.2);

			console.log(distX + " : " + distY);

			jQuery(this).parent('g').append( jQuery(this).delay(10).transition({ scale: [1.2], duration: 10, x: distX, y: distY }) );

		},
		function(){

			jQuery(this).transition({ scale: [1], duration: 10, x: 0, y: 0 }).dequeue();


		});

	});

});


