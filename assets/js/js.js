jQuery(document).ready(function(){

	jQuery('body svg').find('polygon').each(function(){

		jQuery(this).hover(

		function(){

			jQuery(this).transition({ scale: [1.5, 1.5] });
			jQuery(this).parent('g').append();
			
		},
		function(){

			jQuery(this).transition({ scale: [1, 1] });
			jQuery(this).dequeue();

		});

	});

});