$(document).ready(function(){
 
	$(window).scroll(function(){
		var barra = $(window).scrollTop();
		var posicion =  (barra * 0.40);
		
		$('.slide').css({
			'background-position': '0 -' + posicion + 'px'
		});

		$('.promo').css({
			'background-position': '0 -' + posicion + 'px'
		});
 
		$('.lineas').css({
			'background-position': '0 -' + posicion + 'px'
		});

		$('.carac').css({
			'background-position': '0 -' + posicion  + 'px'
		});

		$('.imagenes').css({
			'background-position': '0 -' + posicion  + 'px'
		});

		$('.coleccion').css({
			'background-position': '0 -' + posicion  + 'px'
		});
 
	});
 
});

