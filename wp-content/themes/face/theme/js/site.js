/*!
 * b5st JS
 */
(function ($) {
	'use strict';
	$(document).ready(function() {

		//AOS inicialización
		AOS.init({
			duration: 1200,
		});

		// Boton subir
		window.onscroll = function() {
			scrollFunction();
			};

			function scrollFunction() {
			if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
				document.getElementById("scrollTopBtn").style.display = "block";
			} else {
				document.getElementById("scrollTopBtn").style.display = "none";
			}
			}

			document.getElementById("scrollTopBtn").addEventListener("click", function(){
			document.body.scrollTop = 0; // Para Safari
			document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
		});
	});
}(jQuery));