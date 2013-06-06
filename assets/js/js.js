jQuery(document).ready(function(){

	jQuery('body svg').find('polygon[fill*="url"], rect[fill*="url"]').each(function(){

		jQuery(this).hover(

		function(){
			jQuery(this).parent('g').append(this);
			jQuery(this).transition({ scale: [1.15] }, 'ease');
		},
		function(){
			jQuery(this).transition({ scale: [1] }, 'ease');
			jQuery(this).dequeue();
		});

	});

});